import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "./database";
import { port } from "./config";
import userRouter from "./routes/user.router";
import { verifyOrigin, verifyToken } from "./middlewares";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/user", [verifyOrigin, verifyToken], userRouter);
