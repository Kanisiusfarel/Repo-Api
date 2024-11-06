import { Request, Response, NextFunction } from "express";
import environment from "dotenv";
import jwt from "jsonwebtoken";

environment.config();

export class AuthenticateJwtMiddleware {
  // Middleware to authenticate JWT
  authenticateJwt(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const JWT_SECRET = process.env.JWT_SECRET as string;

    if (!token) {
      return res.status(401).send({
        message: "Access token is missing or invalid",
        status: res.statusCode,
      });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({
          message: "Invalid token",
          status: res.statusCode,
        });
      } else {
        (req as any).user = user; // Attach user info to request object
        next();
      }
    });
  }

  // Middleware to authorize user roles
  authorizeRole(roles: string[]): any {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes((req as any).user.role)) {
        return res.status(403).send({
          message: "Forbidden",
          status: res.statusCode,
        });
      }
      next();
    };
  }
}
