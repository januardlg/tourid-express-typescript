## Environment
### Local Development

During local development, the project runs using a conventional server (app.listen()) that stays active and listens for requests continuously. _Why conventional server locally?_
* Provides instant feedback without cold starts.
* Easier debugging with breakpoints and logging.
* Maintains a persistent database connection (Prisma singleton works seamlessly).
* Simplifies development workflow and testing of routes, middleware, and services.

Tools commonly used: nodemon, ts-node-dev, or similar for hot reloading.
```
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});


```

### Staging Deployment
For staging, the backend is deployed as serverless functions on Vercel, which only run when triggered by requests. _Why serverless in staging/production?_
* Optimized for cloud deployment and auto-scaling.
* Functions run on demand, saving resources when idle.
* Works seamlessly with Neon PostgreSQL, which supports serverless-friendly connection pooling.
* Prisma singleton ensures each function instance reuses a single database connection efficiently.
```
import serverless from "serverless-http";
import dotenv from "dotenv";
import app from "../src/app.js";

dotenv.config();

export default serverless(app);
```

---

## Connection To Databae
### Prisma Singleton Connection 
This project uses a **Prisma singleton connection** pattern to ensure that only **one PrismaClient instance is created per serverless instance**.

By **reusing the same PrismaClient across all requests and services within an instance**, we pr**event Prisma from creating a new database connection on every request**, which can lead to connection exhaustion in serverless environments.

This approach is especially important for staging and production deployments on Vercel, where the backend runs as serverless functions. Combined with Neon (serverless PostgreSQL), this pattern helps maintain efficient and stable database connections in a cloud, serverless architecture.
```
//src/lib/prisma.ts
import { PrismaClient } from "../../generated/prisma/index.js"

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

export const prisma =
    globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}


```
