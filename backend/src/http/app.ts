import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authRoutes } from "../modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

export { app };
