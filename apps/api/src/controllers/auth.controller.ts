import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Auth } from "../models/models";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Login method
  async login(req: Request, res: Response) {
    try {
      const { email, password }: { email: string; password: string } = req.body; // Explicit typing
      const { accessToken, refreshToken, user } = await this.authService.login(email, password);

      res.status(200).send({
        data: {
          user: user,
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        message: "Successfully logged in",
        status: res.statusCode,
      });
    } catch (error: unknown) {
      // Handling unknown error types
      if (error instanceof Error) {
        res.status(400).send({
          message: "Failed to login",
          detail: error.message || "Invalid email or password",
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message: "Failed to login",
          detail: "Unknown error",
          status: res.statusCode,
        });
      }
    }
  }

  // Register method
  async register(req: Request, res: Response) {
    try {
      const user: Auth = req.body; // Using 'Auth' interface to type 'user'
      await this.authService.register(user);

      res.status(201).send({
        message: "Successfully registered",
        status: res.statusCode,
      });
    } catch (error: unknown) {
      // Handling unknown error types
      if (error instanceof Error) {
        res.status(400).send({
          message: "Failed to register",
          detail: error.message || "Registration failed",
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message: "Failed to register",
          detail: "Unknown error",
          status: res.statusCode,
        });
      }
    }
  }

  // Refresh token method
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken }: { refreshToken: string } = req.body; // Explicit typing
      const newAccessToken = await this.authService.refreshToken(refreshToken);

      res.status(200).send({
        data: {
          access_token: newAccessToken,
        },
        message: "Access token refreshed successfully",
        status: res.statusCode,
      });
    } catch (error: unknown) {
      // Handling unknown error types
      if (error instanceof Error) {
        res.status(400).send({
          message: "Failed to refresh token",
          detail: error.message || "Invalid or expired refresh token",
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message: "Failed to refresh token",
          detail: "Unknown error",
          status: res.statusCode,
        });
      }
    }
  }
}
