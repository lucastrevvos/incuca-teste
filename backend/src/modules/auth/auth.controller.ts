import { Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
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

    try {
      const result = await authService.login(parsed.data);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
  }
}
