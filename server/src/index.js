import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import routes from './routes'
import swaggerSpec from './OpenAPISpecification'

const { PORT } = process.env
const app = express()
const server = http.Server(app)


const swaggerUi = require('swagger-ui-express');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', routes.user)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});


server.listen(PORT, () =>
  console.log(`Example app listening on port http://localhost:${PORT}`),
);

