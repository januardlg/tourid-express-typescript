import express from 'express';

import morgan from "morgan";

import { unexpectedErrorHandler } from './middlewares/unexpected-error-handler.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger/swagger-option.js';

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

import cookieParser from 'cookie-parser'

// import routes
import indexRoutes from './routes/index.js'
import blogRoutes from './routes/blogs.js'
import userRoutes from './routes/user.js'
import orderPackageRoutes from './routes/order-package.js'
import packageTourRoutes from './routes/package-tour.js'
import hosterlyPartnerRoutes from './routes/hosterly-partner.js'
import paymentMethodRoutes from './routes/payment-method.js'
import externalBankRoutes from './routes/external-dummy-bank.js'

const app = express();
const theme = new SwaggerTheme();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// Routes
// insert to app
app.use('/', indexRoutes)
app.use('/blogs', blogRoutes)
app.use('/users', userRoutes)
app.use('/orderPackageTour', orderPackageRoutes)
app.use('/packageTour', packageTourRoutes)
app.use('/hosterly-partner', hosterlyPartnerRoutes)
app.use('/payment-method', paymentMethodRoutes)
app.use('/external-bank', externalBankRoutes)

// Global error handler (should be after routes)
// app.use(errorHandler);


const swaggerSpec = swaggerJsdoc(swaggerOptions);

// const options = {
//     explorer: true,
//     customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
// };

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// FOR VERCEL => PREVENT STATIC ERROR ACCESS SWAGGER ASSET INSTEAD CDN
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCssUrl: "https://unpkg.com/swagger-ui-dist/swagger-ui.css",
        customJs: [
            "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js",
            "https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js",
        ],
    })
);


app.use(function (req, res, next) {
    res.status(404).json({ success: false, message: "Route not found" });
});

app.use(unexpectedErrorHandler);

export default app;
