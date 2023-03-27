import { connect, ConnectOptions } from "mongoose";
import { mongoUri } from "./config";

const mongoose = connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

export default mongoose;
