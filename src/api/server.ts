// /api/index.ts
import serverless from "serverless-http";
// import app from "../app"; // your express app
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

export default serverless(app);

// app.listen(process.env.PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
// });
