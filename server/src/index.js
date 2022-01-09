import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import routes from './routes'
import swaggerSpec from './OpenAPISpecification'
import bodyParser from "body-parser"
import swaggerUi from 'swagger-ui-express'

const { PORT } = process.env
const app = express()
const server = http.Server(app)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({type: 'application/json'}))

app.use(cors())
app.use('/users', routes.user)


app.get('/', (req, res) => {
  return res.status(200).json({message: 'ok'});
});


server.listen(PORT, () =>
  console.log(`Example app listening on port http://localhost:${PORT}`),
);

