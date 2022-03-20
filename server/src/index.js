import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import routes from './routes'
import swaggerSpec from './OpenAPISpecification'
import bodyParser from "body-parser"
import swaggerUi from 'swagger-ui-express'
import { readFileActiveUsers } from './realtime-data/active-users'

const { PORT } = process.env
const app = express()
const server = http.Server(app)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({type: 'application/json'}))

app.use(cors())
app.use('/users', routes.user)
app.use('/common', routes.common)
app.use('/settings', routes.setting)


app.get('/', (req, res) => {
  return res.status(200).json({message: 'ok'});
});


server.listen(PORT, async () => {
    await readFileActiveUsers()
    console.log(`Example app listening on port http://localhost:${PORT}`)
  },
);

