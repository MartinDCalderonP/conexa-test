import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const mongoUri = process.env.MONGO_URI || "";
export const secret = process.env.SECRET || "";
export const authUrl = process.env.AUTH_URL;
export const businessUrl = process.env.BUSINESS_URL;
