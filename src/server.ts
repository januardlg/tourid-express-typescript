// /api/index.ts
import serverless from "serverless-http";
// import app from "../app"; // your express app
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

export default serverless(app);
