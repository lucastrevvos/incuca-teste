import { Router } from "express";
import { AuthService } from "./auth.service";
import { loginSchema } from "./auth.schema";
import { AuthController } from "./auth.controller";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
