import { prisma } from "../../db/prisma";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { LoginRequestDTO, LoginResponseDTO } from "./auth.types";
import { getEnvOrThrow } from "../../utils/env";

const JWT_SECRET = getEnvOrThrow("JWT_SECRET");

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
}

export class AuthService {
  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Credencias inválidas");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
