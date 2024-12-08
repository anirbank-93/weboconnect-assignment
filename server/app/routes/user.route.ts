import express from // Express,
//   Request,
//   Response,
"express";

// Middlewares
import { validateRequest, requiresUser } from "../middlewares";

// Schemas
import {
  createUserSchema,
  getUserSchema,
  createUserSessionSchema,
} from "../schemas/user.schema";

// Handlers
import {
  createUserHandler,
  getUserHandler,
} from "../controllers/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler } from "../controllers/auth.controller";

const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//   res.send({
//     message: "Hello from admin!",
//   });
// });

// Register user
router.post("/users", validateRequest(createUserSchema), createUserHandler);

// Login user
router.post(
  "/sessions",
  validateRequest(createUserSessionSchema),
  createUserSessionHandler
);

// Get user
router.get("/users/:id", requiresUser, validateRequest(getUserSchema), getUserHandler);

// Edit user
router.put("/users/:id");

// Logout (delete session)
router.delete("/sessions", requiresUser, invalidateUserSessionHandler);

export default router;
