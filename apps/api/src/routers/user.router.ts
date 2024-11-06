import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthenticateJwtMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();
const authenticateJwt = new AuthenticateJwtMiddleware();

// Route for purchasing an event ticket
router.post(
  "/purchase",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["user"]).bind(authenticateJwt),
  userController.purchaseEventTicket.bind(userController)
);

// Route for retrieving transaction history by user ID
router.get(
  "/history/:user_id",
  authenticateJwt.authenticateJwt.bind(authenticateJwt),
  authenticateJwt.authorizeRole(["user"]).bind(authenticateJwt),
  userController.getTransactionHistory.bind(userController)
);

// Route for fetching a list of events with filters
router.get("/events", userController.getEvents.bind(userController));

// Route for fetching event details by event ID
router.get("/events/detail/:eventId", userController.getEventById.bind(userController));

export default router;
