import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Menambahkan tipe khusus untuk request yang sudah memiliki properti 'user'
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export class AuthenticateJwtMiddleware {
  // Middleware untuk autentikasi JWT
  authenticateJwt(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).send({
        message: "Access token is missing or invalid",
        status: res.statusCode,
      });
      return; // Jangan lanjutkan eksekusi
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        res.status(401).send({
          message: "Invalid or expired token",
          status: res.statusCode,
        });
        return; // Jangan lanjutkan eksekusi
      }

      req.user = decoded as JwtPayload; // Menyimpan informasi user
      next(); // Lanjutkan ke middleware berikutnya
    });
  }

  // Middleware untuk otorisasi berdasarkan role user
  authorizeRole(roles: string[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
      const userRole = req.user?.role;

      if (!userRole || !roles.includes(userRole)) {
        res.status(403).send({
          message: "Forbidden: You do not have the required permissions",
          status: res.statusCode,
        });
        return; // Jangan lanjutkan eksekusi
      }

      next(); // Lanjutkan ke middleware berikutnya
    };
  }
}
