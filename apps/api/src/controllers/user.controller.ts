import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async purchaseEventTicket(req: Request, res: Response) {
    const { userId, eventId, quantity, couponId } = req.body;

    try {
      const transaction = await this.userService.purchaseEventTicket(
        userId,
        eventId,
        quantity,
        couponId
      );

      res.status(201).send({
        message: "Successfully purchased event ticket",
        status: res.statusCode,
        data: transaction,
      });
    } catch (error: unknown) {  // Ganti any ke unknown
      if (error instanceof Error) {  // Cek apakah error adalah instance dari Error
        res.status(400).send({
          message: "Failed to purchase event ticket",
          status: res.statusCode,
          detail: error.message,
        });
      } else {
        res.status(400).send({
          message: "An unknown error occurred",
          status: res.statusCode,
        });
      }
    }
  }

  async getTransactionHistory(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const history = await this.userService.getTransactionHistory(Number(userId));

      if (history.length > 0) {
        res.status(200).send({
          data: history,
          message: "Transaction history successfully fetched",
          status: res.statusCode,
        });
      } else {
        res.status(404).send({
          message: "No transaction history found",
          status: res.statusCode,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send({
          message: "Failed to fetch transaction history",
          status: res.statusCode,
          detail: error.message,
        });
      } else {
        res.status(500).send({
          message: "An unknown error occurred",
          status: res.statusCode,
        });
      }
    }
  }

  async getEvents(req: Request, res: Response) {
    const { search, category, venue, minPrice, maxPrice, sortBy, sortOrder } = req.query;

    try {
      const events = await this.userService.getEvents(
        search as string,
        category as string,
        venue as string,
        minPrice ? Number(minPrice) : null,
        maxPrice ? Number(maxPrice) : null,
        sortBy as "price" | "name",
        sortOrder as "asc" | "desc",
      );

      if (events.length > 0) {
        res.status(200).send({
          data: events,
          message: "Events successfully retrieved",
          status: res.statusCode,
        });
      } else {
        res.status(404).send({
          message: "No events found",
          status: res.statusCode,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send({
          message: "Failed to retrieve events",
          status: res.statusCode,
          detail: error.message,
        });
      } else {
        res.status(500).send({
          message: "An unknown error occurred",
          status: res.statusCode,
        });
      }
    }
  }

  async getEventById(req: Request, res: Response) {
    const { eventId } = req.params;

    try {
      const event = await this.userService.getEventById(Number(eventId));

      if (event) {
        res.status(200).send({
          data: event,
          message: `Event with ID ${eventId} successfully retrieved`,
          status: res.statusCode,
        });
      } else {
        res.status(404).send({
          message: `Event with ID ${eventId} not found`,
          status: res.statusCode,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send({
          message: "Failed to retrieve event",
          status: res.statusCode,
          detail: error.message,
        });
      } else {
        res.status(500).send({
          message: "An unknown error occurred",
          status: res.statusCode,
        });
      }
    }
  }
}
