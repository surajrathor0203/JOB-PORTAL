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