// import express from 'express';
// // // import itemRoutes from './routes/itemRoutes';
// // // import { errorHandler } from './middlewares/errorHandler';
// import indexRoutes from './routes/index.js'

// const app = express();

// app.use(express.json());

// // Routes
// // app.use('/api/items', itemRoutes);
// app.use('/', indexRoutes)

// // Global error handler (should be after routes)
// // app.use(errorHandler);

// export default app;

import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from app.ts using nodemon.  tes");
});

export default app;
