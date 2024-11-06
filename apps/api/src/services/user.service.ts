import { PrismaClient } from "@prisma/client";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getEvents(
    search: string = "",
    category: string = "",
    venue: string = "",
    minPrice: number | null = null,
    maxPrice: number | null = null,
    sortBy: "price" | "name" = "name",
    sortOrder: "asc" | "desc" = "asc"
  ) {
    const whereConditions: any = {
      name: {
        contains: search,
        mode: "insensitive",
      },
      category: {
        contains: category,
        mode: "insensitive",
      },
      // Adding venue filter if provided
      ...(venue && {
        venue: {
          contains: venue,
          mode: "insensitive",
        },
      }),
      // Adding price range filter if minPrice or maxPrice are provided
      ...(minPrice !== null && {
        price: {
          gte: minPrice,
        },
      }),
      ...(maxPrice !== null && {
        price: {
          lte: maxPrice,
        },
      }),
    };

    return this.prisma.events.findMany({
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }

  async getEventById(eventId: number) {
    return this.prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
    });
  }

  async purchaseEventTicket(userId: number, eventId: number, quantity: number, couponId?: number) {
    // Check if the event exists and has sufficient stock
    const event = await this.prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
    });

    if (!event || event.stock < quantity) {
      throw new Error("Event not available or stock insufficient");
    }

    let totalPrice = 0;

    // Check if a coupon is applied and validate it
    if (couponId) {
      const coupon = await this.prisma.coupons.findUnique({
        where: { coupon_id: couponId },
      });

      // Ensure the coupon is valid for the event and within the date range
      const currentDate = new Date();
      if (
        coupon &&
        coupon.productId === eventId &&
        currentDate >= new Date(coupon.start_date) &&
        currentDate <= new Date(coupon.end_date)
      ) {
        // Apply coupon discount to the price
        const discount = coupon.discount_percentage / 100;
        totalPrice = (event.discounted_price || event.price) * (1 - discount) * quantity;
      } else {
        throw new Error("Invalid or expired coupon");
      }
    } else {
      // No coupon, calculate total price based on discounted price if available
      totalPrice = (event.discounted_price || event.price) * quantity;
    }

    // Update event stock
    await this.prisma.events.update({
      where: {
        event_id: eventId,
      },
      data: {
        stock: event.stock - quantity,
      },
    });

    // Create a transaction
    const transaction = await this.prisma.transactions.create({
      data: {
        userId: userId,
        eventId: eventId,
        quantity: quantity,
        total_price: totalPrice,
      },
    });

    return transaction;
  }

  async getTransactionHistory(userId: number) {
    return this.prisma.transactions.findMany({
      where: { userId: userId },
      include: {
        event: true,
      },
    });
  }
}

