import { Request, Response, NextFunction } from "express";
import environment from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

environment.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthenticateJwtMiddleware {
  // Middleware to authenticate JWT
  authenticateJwt(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "Access token is missing or invalid",
        status: res.statusCode,
      });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).send({
          message: "Invalid or expired token",
          status: res.statusCode,
        });
      }

      // Attach decoded user information to the request object for later use
      (req as any).user = decoded as JwtPayload;
      next();
    });
  }

  // Middleware to authorize user roles
  authorizeRole(roles: string[]): any {
    return (req: Request, res: Response, next: NextFunction) => {
      const userRole = (req as any).user?.role;

      if (!userRole || !roles.includes(userRole)) {
        return res.status(403).send({
          message: "Forbidden: You do not have the required permissions",
          status: res.statusCode,
        });
      }
      next();
    };
  }
}
