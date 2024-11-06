import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Auth } from "../models/models";
import { PrismaClient } from "@prisma/client";
import { authSchema } from "../validators/auth.validator";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async register(data: Auth) {
    // Validate data with schema
    const validatedData = authSchema.parse(data);
    
    // Hash the password for storage
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create a new user in the database
    return this.prisma.users.create({
      data: {
        name: data.name,
        email: validatedData.email,
        password: hashedPassword,
        role: data.role,
      },
    });
  }

  async login(email: string, password: string) {
    // Validate email and password input
    const validatedData = authSchema.parse({ email, password });

    // Find the user by email
    const user = await this.prisma.users.findUnique({
      where: { email: validatedData.email },
    });

    // Check if user exists and if the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ id: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    // Save the refresh token in the database
    await this.prisma.users.update({
      where: { email },
      data: { refresh_token: refreshToken },
    });

    return { accessToken, refreshToken, user };
  }

  async refreshToken(token: string) {
    try {
      // Verify and decode the token
      const decoded: any = jwt.verify(token, JWT_SECRET);

      // Find the user associated with the token
      const user = await this.prisma.users.findUnique({
        where: { user_id: decoded.id },
      });

      if (!user) {
        throw new Error("Invalid refresh token");
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { id: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return newAccessToken;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
}
