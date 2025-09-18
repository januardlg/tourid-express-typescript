import express from 'express';

import morgan from "morgan";

import { unexpectedErrorHandler } from './middlewares/unexpected-error-handler.js';

// import routes
import indexRoutes from './routes/index.js'
import blogRoutes from './routes/blogs.js'

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Routes
// insert to app
app.use('/', indexRoutes)
app.use('/blogs', blogRoutes)

// Global error handler (should be after routes)
// app.use(errorHandler);

app.use(function (req, res, next) {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use(unexpectedErrorHandler);

export default app;
