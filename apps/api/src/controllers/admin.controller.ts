import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { Event } from "../models/models";
import { EmailService } from "../services/email.service";

export class AdminController {
  private adminService: AdminService;
  private emailService: EmailService;

  constructor() {
    this.adminService = new AdminService();
    this.emailService = new EmailService();
  }

  async getEvents(req: Request, res: Response) {
    try {
      const events = await this.adminService.getEvents();
      if (events) {
        res.status(200).send({
          data: events,
          status: res.statusCode,
        });
      } else {
        res.status(404).send({
          message: "Failed to fetch events",
          status: res.statusCode,
          details: res.statusMessage,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Failed to fetch events",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const id = Number(req.params.eventId);
      const event = await this.adminService.getEventById(id);
      if (event) {
        res.status(200).send({
          message: `Event ${id} was successfully retrieved`,
          status: res.statusCode,
          data: event,
        });
      } else {
        res.status(404).send({
          message: `Event ${id} could not be retrieved`,
          status: res.statusCode,
          details: res.statusMessage,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Failed to fetch event",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const { name, description, category, price, stock, image, emails }: { 
        name: string; 
        description: string; 
        category: string; 
        price: number; 
        stock: number; 
        image: string | null; 
        emails?: string[]; // Array of emails
      } = req.body;

      const event: Event = {
        name,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
        image,
      };

      const data = await this.adminService.createEvent(event);

      // After creating the event, send email to the provided email addresses
      if (emails && emails.length > 0) {
        await this.emailService.sendEmail(emails, data);  // Send the email with event details
      }

      res.status(201).send({
        message: "Event created successfully",
        status: res.statusCode,
        data: data,
      });
    } catch (error) {
      res.status(400).send({
        message: "Failed to create event",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.eventId);
      const updatedEvent = await this.adminService.updateEvent(id, req.body);
      if (updatedEvent) {
        const { emails } = req.body; // Expecting email list in request body
        if (emails && emails.length > 0) {
          await this.emailService.sendEmail(emails, updatedEvent);  // Send email with updated event details
        }

        res.status(200).send({
          message: "Update event successfully",
          status: res.statusCode,
          data: updatedEvent,
        });
      } else {
        res.status(400).send({
          message: "Failed to update event",
          status: res.statusCode,
          details: res.statusMessage,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Failed to update event",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const id = Number(req.params.eventId);
      const deletedEvent = await this.adminService.deleteEvent(id);
      if (deletedEvent) {
        res.status(200).send({
          message: "Delete event successfully",
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message: "Failed to delete event",
          status: res.statusCode,
          details: res.statusMessage,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Failed to delete event",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }

  async getTransactionHistory(req: Request, res: Response) {
    try {
      const transactions = await this.adminService.getTransactionHistory();
      if (transactions) {
        res.status(200).send({
          data: transactions,
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message: "Failed to fetch transaction history",
          status: res.statusCode,
          details: res.statusMessage,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Failed to fetch transaction history",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }

  async getCoupons(req: Request, res: Response) {
    try {
      const coupons = await this.adminService.getCoupons();
      if (coupons) {
        res.status(200).send({
          data: coupons,
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message: "Failed to fetch coupons",
          status: res.statusCode,
          details: res.statusMessage,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Failed to fetch coupons",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }

  async createCoupon(req: Request, res: Response) {
    try {
      const couponData = req.body;
      const newCoupon = await this.adminService.createCoupon(couponData);
      res.status(201).send({
        message: "Coupon created successfully",
        status: res.statusCode,
        data: newCoupon,
      });
    } catch (error) {
      res.status(400).send({
        message: "Failed to create coupon",
        detail: (error as Error).message || "Unknown error",
        status: res.statusCode,
      });
    }
  }
}
