import express from "express";
import { loginControler, registerController } from "../controllers/authController.js";
import { rateLimit } from 'express-rate-limit';


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
})

//router object
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - lastName
 *        - email
 *        - password
 *        - location
 *      properties:
 *        id:
 *          type: string
 *          description: the Auto-generated id of user collection
 *        name:
 *          type: string
 *          description: user name
 *        lastName:
 *          type: string
 *          description: user last name
 *        email:
 *          type: string
 *          description: user email address
 *        password:
 *          type: string
 *          description: user password should be greater than 8 characters
 *        location:
 *          type: string
 *          description: user location city or country
 *    UserExample:
 *      type: object
 *      properties:
 *        id: "234567"
 *        name: "john"
 *        lastName: "doe"
 *        email: "johndoes@gmail.com"
 *        password: "test!123"
 *        location: "mumbai"
 */

//register||post
router.post('/register', limiter, registerController)

//login||post
router.post('/login', limiter, loginControler)

//export
export default router

