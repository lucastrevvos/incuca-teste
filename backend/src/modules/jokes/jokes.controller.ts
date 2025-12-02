import { Response } from "express";

import { AuthenticatedRequest } from "../../middlewares/ensureAuthenticated";
import { JokesService } from "./jokes.service";

const jokesService = new JokesService();

export class JokesController {
  async random(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const result = await jokesService.getRandomJokeAndLog(req.user.id);

    return res.json(result);
  }
}
