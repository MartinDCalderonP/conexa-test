import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "./database";
import { port } from "./config";
import verifyToken from "./middlewares/verifyToken";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/auth/", authRoutes);
app.use("/user/", verifyToken, userRoutes);
