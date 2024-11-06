import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";
import { Event } from "../models/models";

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  async getEvents(req: Request, res: Response) {
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
  }

  async getEventById(req: Request, res: Response) {
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
  }

  async createEvent(req: Request, res: Response) {
    try {
      const { name, description, category, price, stock, image } = req.body;

      const event: Event = {
        name: name,
        description: description,
        category: category,
        price: Number(price),
        stock: Number(stock),
        image: image,
      };

      const data = await this.adminService.createEvent(event);
      res.status(201).send({
        message: "Event created successfully",
        status: res.statusCode,
        data: data,
      });
    } catch (error: any) {
      res.status(400).send({
        message: "Failed to create event",
        detail: error.errors || error.message,
        status: res.statusCode,
      });
    }
  }

  async updateEvent(req: Request, res: Response) {
    const id = Number(req.params.eventId);
    const updatedEvent = await this.adminService.updateEvent(id, req.body);
    if (updatedEvent) {
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
  }

  async deleteEvent(req: Request, res: Response) {
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
  }

  async getTransactionHistory(req: Request, res: Response) {
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
  }

  async getCoupons(req: Request, res: Response) {
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
    } catch (error: any) {
      res.status(400).send({
        message: "Failed to create coupon",
        detail: error.errors || error.message,
        status: res.statusCode,
      });
    }
  }
}

