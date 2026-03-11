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

## Data Contract

This project uses shared TypeScript interfaces as data contracts between the frontend and Express backend.
The goal is to ensure:
- Type safety across layers
- Clear API boundaries
- Easier refactoring when contracts evolve

---
#### Common
##### BaseResponse
- statusCode: number
- status: string
- message: string
##### Notes
- All response will extend this `BaseResponse` and data will be wrapped using key `data`

### MetaResponse
- page: number
- limit: number
- totalPage: number

### Core Contract: Register
#### RegisterRequest
- username: string (required, 5-20 characters)
- email: string (required, email format)
- password: string (required, min 8 characters and at least 1 uppercase and at least 1 number)

##### Notes
- validation is for both frontend and backend

#### RegisterResponse
- username: string
- email: string
- isAdmin: boolean (default: false)

##### Notes
- `password` is never returned in any response.
- `isAdmin` is assigned by the system and can not be set by request.

---
### Core Contract: Login
#### LoginRequest
- email: string (required)
- password: string (required, min 8 characters and at least 1 uppercase and at least 1 number)

#### LoginResponse
- accessToken: string
##### Notes
- `accessToken` is using for access authorized API

---
### Core Contract: Refresh Token
#### RefreshTokenResponse
- accessToken: string

---
### Core Contract: Get Package Tour Data
#### PackageTourListQuery
- page : number (integer, min 1)
- limit : number (integer, min 1)
- sortBy : string (refer to field)
- order : "asc"|"desc"
- filterBy: string (refer to field)
- filterValue: string
##### Notes
-  all query parameters default value defined on backend
- Query parameters are received as strings and parsed to integers when needed (`page`, `limit`).

#### PackageTourListResponse
- packageId: number
- packageName: string
- cost: string(decimal)
- description: string
- startDate: string ISO 8601
- endDate: string ISO 8601
- activities:Activity[]
- hostelryPartnerName: string
- createdAt: string ISO 8601
- updatedAt: string ISO 8601
#### Activity
- day: number
- destinations: string[]
##### Notes
- PackageTourResponse is wrap in `data` and extends the `MetaResponse` and `BaseResponse`
- `cost` is represented as string to avoid floating precision issue

---
### Core Contract: Add Package Tour Data
#### PackageTourRequest
- packageName: string  (required, 10-60 characters)
- cost: string(decimal) (required)
- description: string (required, text, min 20 characters)
- startDate: string ISO 8601 (required)
- endDate: string ISO 8601 (required)
- activities:Activity[] (required)
- hostelryPartnerId: number (required, refer to hosterly partner data)
### Authentication
- This requires a valid user token to be provided via request `headers`.

#### PackageTourResponse
- packageId: number 
- packageName: string
- createdAt: string ISO 8601
- updatedAt: string ISO 8601

---
### Core Contract: Get Package Tour Detail Data
#### PackageTourDetailResponse
- packageId: number
- packageName: string
- cost: string(decimal)
- description: string
- startDate: string ISO 8601
- endDate: string ISO 8601
- activities:Activity[]
- hostelryPartnerName: string
- hosterlyPartnerLocation: string
- createdAt: string ISO 8601
- updatedAt: string ISO 8601

---
### Core Contract: Create Order Package Tour
#### OrderPackageTourRequest
- tourPackageId: number (required, refer to Package Tour )
- paymentMethodId: numnber (required, refer to payment method)
- numberOfGuests: number (requried)
- totalPayment: string (decimal) (requried)

#### CreateOrderPackageTourResponse
- orderTourPackageId: number
- tourPackageId: number
- paymentMethodId: number
- paymentStatus : string
- totalPayment: string (decimal)
- referenceNumber: string
- expiredAt: string ISO 8601

### Core Contract: Get Order Package Tour
#### OrderPackageTourResponse
- orderTourPackageId: number
- packageTourName: string
- paymentStatus : string
- paymentMethodName: string
- paymentDestinationAccount: string
- numberOfGuests: string
- totalPayment: string (decimal) (requried)
- referenceNumber: string
- createdAt: string ISO 8601
- expiredAt: string ISO 8601




