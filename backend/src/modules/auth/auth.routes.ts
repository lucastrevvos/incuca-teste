import { Router } from "express";
import { AuthService } from "./auth.service";
import { loginSchema } from "./auth.schema";

const authRoutes = Router();
const authService = new AuthService();

authRoutes.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res.status(400).json({
        message: "Dados inválidos",
        errors,
      });
    }

    const result = await authService.login(parsed.data);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Credencias inválidas",
    });
  }
});

export { authRoutes };
