import request from "supertest";
import bcrypt from "bcryptjs";

import { prisma } from "../../db/prisma";
import { app } from "../../http/app";

const TEST_EMAIL = "cliente@incuca.com.br";
const TEST_PASSWORD =
  "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga.";

describe("GET /jokes/random (integração)", () => {
  let token: string;

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

    const loginResponse = await request(app)
      .post("/auth/login")
      .send({ email: TEST_EMAIL, password: TEST_PASSWORD });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve impedir acesso sem token", async () => {
    const response = await request(app).get("/jokes/random");
    expect(response.status).toBe(401);
  });

  it("deve retornar uma piada quando autenticado", async () => {
    const response = await request(app)
      .get("/jokes/random")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("joke");
    expect(typeof response.body.joke).toBe("string");
  });
});
