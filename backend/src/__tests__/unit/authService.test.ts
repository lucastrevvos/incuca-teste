import { prisma } from "../../db/prisma";
import bcrypt from "bcryptjs";
import { AuthService } from "../../modules/auth/auth.service";

jest.mock("../../db/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs");

describe("AuthService.login (unitário)", () => {
  const service = new AuthService();

  const EMAIL = "cliente@incuca.com.br";
  const PASSWORD = "senha_teste";
  const HASHED_PASSWORD = "hashed_password";

  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve autenticar usuário válido e retornar token + dados do usuário", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: EMAIL,
      password: HASHED_PASSWORD,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login({ email: EMAIL, password: PASSWORD });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: EMAIL },
    });

    expect(bcrypt.compare).toHaveBeenCalledWith(PASSWORD, HASHED_PASSWORD);

    expect(result).toHaveProperty("token");
    expect(result.user).toEqual({
      id: 1,
      email: EMAIL,
    });
  });

  it("deve lançar erro se usuário não existir", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      service.login({ email: EMAIL, password: PASSWORD }),
    ).rejects.toThrow("Credenciais inválidas");
  });

  it("deve lançar erro se senha for inválida", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: EMAIL,
      password: HASHED_PASSWORD,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login({ email: EMAIL, password: PASSWORD }),
    ).rejects.toThrow("Credenciais inválidas");
  });
});
