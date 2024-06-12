import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "./auth-controller.js";
import { jwtValidator } from "../../middleware/jwt-middleware.js";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/logout", jwtValidator, logoutController);

export { authRouter };
