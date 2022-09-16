import swaggerJsdoc from 'swagger-jsdoc'

const { PORT } = process.env
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat_g',
      version: '1.0.0',
    },
  },
  failOnErrors: false,
  host: `localhost:${PORT}`, // Host (optional)
  apis: ['./src/routes/*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
