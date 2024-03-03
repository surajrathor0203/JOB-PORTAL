///api documention
import swaggerUi, { serve } from "swagger-ui-express";
// import swaggerDoc from "swagger-doc";
import swaggerJSDoc from "swagger-jsdoc";

// //packages imports
import express from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import colors from 'colors';
import cors from "cors";
import morgan from "morgan";
// security packeges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
// //files imports
import connectDB from "./config/db.js";
// //routes
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errroMiddelware from "./middelwares/errromiddleware.js";
import jobsRoute from './routes/jobsRoute.js';
import userRoutes from './routes/userRoutes.js';



// //dot env config

dotenv.config();

// // mongoDB connection
connectDB();

// swagger api config
// swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "job portal applicaton",
            description: "Node Expressjs job portal application"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }

        ]
    },
    apis: ["./routers/*.js"],

};

const spec = swaggerJSDoc(options)

const app = express()

// // routes
app.get('/', (req, res) => {
    res.send("<h1>welcome to job portel<h1>")
})

// //middelwares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoute);

//homeroute root
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

// //validaton middelware
app.use(errroMiddelware);

// //port
const PORT = process.env.PORT || 8080
// //listen

app.listen(PORT, () => {

    console.log(`node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`.yellow);
});


