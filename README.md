# tour.id Backend — Express API (MVP)

This is the backend service for **tour.id**, built using Express.js.  
It provides APIs for tour browsing, booking, checkout, and payment verification.

The project focuses on implementing a clean and scalable backend architecture with authentication, database management, and API documentation.

---

## Live Demo

🌐 https://tourid-express-typescript.vercel.app/ 

You can explore the deployed API and test available endpoints.
---

## Features (MVP Scope)

- Get tour list with filtering  
- Get tour detail  
- Checkout tour package  
- Payment verification  
- Payment Confirmation
- Get user booked tours  
- JWT-based authentication  

---

## Tech Stack

### Backend Framework
- Express.js  

### Authentication
- Passport.js (JWT Strategy)  

### Database
- PostgreSQL  
- Prisma ORM  

### API Documentation
- Swagger UI  
- Available at: `/api-docs`  

---

## Architecture Highlights

- **RESTful API design**  
- **JWT authentication using Passport**  
- **Prisma ORM for type-safe database queries**  
- **Layered structure (controller → service → repository)**  
- **Environment-based configuration**  

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Setup Environment Variables
Create a .env file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/tourdb"
JWT_SECRET="your_secret_key"
PORT=3000
```

### 3. Install Dependencies
```bash
    npm install
```

### 4. Setup Database (Prisma)
```bash
    npm run prisma:generate:dev
    npm run prisma:migrate:dev
    npm run prisma:seed:dev
```

### 5. Run the Server
```bash
    npm run dev
```

## Run with Docker
This project includes Docker support for both Express API and PostgreSQL database.

### 1. Build & Start Container
```bash 
docker compose up --build 
```

### 2. Run Prisma Migration & Seed
Make sure the container is running before executing Prisma commands.
```bash
    npm run prisma:migrate:dev
    npm run prisma:seed:dev
```

## Project Structure
```
```

## API Documentation
Swagger documentation is available at:
```
 http://localhost:3000/api-docs
```
Include :
- Endpoint list
- Request/response schema
- Data contract

## Authentication

This API uses **JWT (JSON Web Token)** for authentication.

- Token is generated after login  
- Protected routes require `Authorization: Bearer <token>` header  
- Passport middleware is used to validate requests  

---

## Future Improvements

- Refresh token mechanism  
- Rate limiting & security hardening  
- Logging & monitoring (Winston / Morgan)  
- Unit & integration testing  
- CI/CD pipeline  
- Production-ready deployment (Docker + cloud infra)  

---

## Why This Project?

This backend was built to:

- Practice building a **real-world REST API with Express**  
- Implement **JWT authentication using Passport**  
- Use **Prisma ORM with PostgreSQL**  
- Design a **clean and maintainable backend architecture**  



## Vercel Environment
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

## Deploy on Vercel
Feel free to check the result : https://tourid-express-typescript.vercel.app/api-docs/

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




