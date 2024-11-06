import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { AuthenticateJwtMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const router = Router();
const adminController = new AdminController();
const authenticateJwt = new AuthenticateJwtMiddleware();

// Routes for managing events
router.post(
  "/events",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  upload.single("image"), // Optional if images are being uploaded
  adminController.createEvent.bind(adminController)
);
router.get(
  "/events",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  adminController.getEvents.bind(adminController)
);
router.get(
  "/events/:eventId",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  adminController.getEventById.bind(adminController)
);
router.put(
  "/events/:eventId",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  adminController.updateEvent.bind(adminController)
);
router.delete(
  "/events/:eventId",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  adminController.deleteEvent.bind(adminController)
);

// Route for transaction history
router.get(
  "/transactions",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  adminController.getTransactionHistory.bind(adminController)
);

// Routes for managing coupons
router.get(
  "/coupons",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  adminController.getCoupons.bind(adminController)
);
router.post(
  "/coupons",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["admin"]).bind(authenticateJwt),
  adminController.createCoupon.bind(adminController)
);

export default router;


