import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload extends JwtPayload {
  sub: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export function ensureAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as unknown;

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "sub" in decoded &&
      "email" in decoded
    ) {
      const payload = decoded as TokenPayload;

      req.user = {
        id: Number(payload.sub),
        email: payload.email,
      };

      return next();
    }

    return res
      .status(401)
      .json({ message: "Token inválido (payload inesperado)" });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
