import express from 'express';

import morgan from "morgan";

import { unexpectedErrorHandler } from './middlewares/unexpected-error-handler.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger/swagger-option.js';

// import routes
import indexRoutes from './routes/index.js'
import blogRoutes from './routes/blogs.js'
import userRoutes from './routes/user.js'
import orderPackageRoutes from './routes/order-package.js'
import packageTourRoutes from './routes/package-tour.js'

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Routes
// insert to app
app.use('/', indexRoutes)
app.use('/blogs', blogRoutes)
app.use('/users', userRoutes)
app.use('/orderPackageTour', orderPackageRoutes)
app.use('/packageTour', packageTourRoutes)

// Global error handler (should be after routes)
// app.use(errorHandler);


const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(function (req, res, next) {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use(unexpectedErrorHandler);

export default app;
