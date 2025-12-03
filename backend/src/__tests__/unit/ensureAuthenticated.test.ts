import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../../config/env";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

describe("ensureAuthenticated middleware (unitário)", () => {
  const mockUserId = 123;
  const mockEmail = "cliente@incuca.com.br";

  function createMockReq(authHeader?: string): Request {
    return {
      headers: authHeader ? { authorization: authHeader } : {},
    } as Request;
  }

  function createMockRes() {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  }

  function createMockNext() {
    return jest.fn() as NextFunction;
  }

  it("retorna 401 se token não for informado", () => {
    const req = createMockReq();
    const res = createMockRes();
    const next = createMockNext();

    ensureAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token não informado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("chama next e preenche req.user com token válido", () => {
    const token = jwt.sign(
      { sub: mockUserId, email: mockEmail },
      env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    const req = createMockReq(`Bearer ${token}`);
    const res = createMockRes();
    const next = createMockNext();

    ensureAuthenticated(req, res, next);

    expect(next).toHaveBeenCalled();
    expect((req as any).user).toEqual({
      id: mockUserId,
      email: mockEmail,
    });
  });
});
