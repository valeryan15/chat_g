import express, { Router } from 'express'
import db from '../database'
import { tokenKey } from '../constants'
import jwt from 'jsonwebtoken'
import { getActiveUserById } from '../realtime-data/active-users'

const DatabaseUrlUsers = 'server/users'
const router = Router()
//TODO удалить дублирование
// const schema = checkSchema({
//   login: {
//     in: ['params'],
//     isLength: {
//       errorMessage: 'must be no more than 50 chars',
//       options: {
//         max: 50
//       }
//     },
//     isEmpty: {
//       negated: true
//     },
//     trim: true,
//     escape: true,
//     matches: {
//       negated: true,
//       errorMessage: 'there should be no spaces',
//       options: [/\ /]
//     },
//   }
// })
router.use(express.json())
router.use((req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      tokenKey,
      (err, payload) => {
        if (err) next()
        else if (payload) {
          const activeUser = getActiveUserById(payload.id)
          if (activeUser) {
            req.user = activeUser
            next()
          }

          if (!req.user) next()
        }
      }
    )
  } else {
    next()
  }
})

/**
 * @openapi
 * /users:
 *   get:
 *     description: Получение списка пользователей
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', async (req, res) => {
  const ref = db.ref(DatabaseUrlUsers)
  let snapshot = await ref.once('value')
  const users = snapshot.val() ? Object.values(snapshot.val()) : []
  return res.status(200).json(users)
})

/**
 * @openapi
 * /users/get-info:
 *   post:
 *     parameters:
 *         - in: path
 *           name: login
 *           schema:
 *             type: string
 *           required: true
 *           description: Numeric ID of the user to get
 *     description: Получение пользователя по логину
 *     responses:
 *       200:
 *         description: Возвращает обект пользователя.
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                   login:
 *                     type: string
 *                     description: логин.
 */
router.post('/get-info', async (req, res) => {
  if (!req.user)
    return res.status(401).json({ message: 'Not authorized' })
  const ref = db.ref(`${DatabaseUrlUsers}/${req.body.login}`)
  let snapshot = await ref.once('value')
  const user = snapshot.val()
  delete user.password
  return res.status(200).json(user)
})

export default router
