// file ini untuk meletakkan feature logic, script SQL, script ORM, dll.
// tidak boleh meletakkan response disini

// export class FeatureService {
//   async getFeatures() {
//     return;
//   }
// }


import { PrismaClient } from "@prisma/client"; 
import { Event } from "../models/events";
import { eventSchema } from "../validators/event.validator";
import cloudinary from "../config/cloudinary"; 

export class EventService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); 
  }

  async getEvents() {
    return this.prisma.events.findMany(); 
  }

  async getEventById(event_id: number) {
    return this.prisma.events.findUnique({
      where: { event_id }, 
    });
  }

  async createEvent(data: Event) {
    const validatedData = eventSchema.parse(data); 

    const uploadResponse = await cloudinary.uploader.upload(
      validatedData.image,
      { folder: "events" } 
    );

    return this.prisma.events.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        category: validatedData.category,
        price: validatedData.price,
        stock: validatedData.stock,
        image: uploadResponse.secure_url, 
      },
    });
  }

  async updateEvent(event_id: number, data: Event) {
    return this.prisma.events.update({
      where: { event_id }, 
      data, 
    });
  }

  async deleteEvent(event_id: number) {
    return this.prisma.events.delete({
      where: { event_id }, 
    });
  }
}
