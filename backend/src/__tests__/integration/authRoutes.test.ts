import request from "supertest";
import bcrypt from "bcryptjs";

import { prisma } from "../../db/prisma";
import { app } from "../../http/app";

const TEST_EMAIL = "cliente@incuca.com.br";
const TEST_PASSWORD =
  "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga.";

describe("POST /auth/login (integração)", () => {
  beforeAll(async () => {
    const hashed = await bcrypt.hash(TEST_PASSWORD, 10);

    await prisma.user.upsert({
      where: { email: TEST_EMAIL },
      update: { password: hashed },
      create: {
        email: TEST_EMAIL,
        password: hashed,
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve autenticar com credenciais válidas e retornar um token", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.email).toBe(TEST_EMAIL);
  });

  it("deve retornar 401 para credenciais inválidas", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: TEST_EMAIL, password: "senha_errada" });

    expect(response.status).toBe(401);
  });
});
