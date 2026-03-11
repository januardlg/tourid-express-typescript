import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
    console.error("❌ Server failed to start:", err);
});
