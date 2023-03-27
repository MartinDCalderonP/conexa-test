import { mongoUri } from "./config";
import { connect } from "mongoose";

const mongoose = connect(mongoUri)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

export default mongoose;
