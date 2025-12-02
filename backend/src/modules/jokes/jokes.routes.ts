import { Router } from "express";
import { JokesController } from "./jokes.controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const jokesRoutes = Router();
const jokesController = new JokesController();

jokesRoutes.get("/random", ensureAuthenticated, (req, res) =>
  jokesController.random(req, res),
);

export { jokesRoutes };
