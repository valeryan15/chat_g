import express, { Router } from 'express'
import { removeActiveUser } from '../realtime-data/active-users'
import authMiddleware from '../middleware/auth.middleware'
import { getUserByLogin, getUserChats, getUsers } from '../database-function/users.function'
import { getSettingsById } from '../database-function/settings.function'

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
router.use(authMiddleware)

/**
 * @openapi
 * /users:
 *   post:
 *     description: Получение списка пользователей
 *     responses:
 *       200:
 *         description: Список пользователей.
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    description: ID пользователя.
 *                  login:
 *                    type: string
 *                    description: Логин пользователя.
 *                  chatExist:
 *                    type: boolean
 *                    description: говорит о существование чата с этим пользователем.
 */
router.post('/', async (req, res) => {
  const users = await getUsers()
  return res.status(200).json(users.map(user => {
    return {
      id: user.id,
      login: user.login,
      chatExist: user.chats.some(c => c.name === req.user.login)
    }
  }))
})
/**
 * @openapi
 * /users/get-user:
 *   post:
 *     description: Получение данных пользователя
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
 *                   settings:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID настроек.
 *                       name:
 *                         type: string
 *                         description: ФИО пользователя.
 *                       phone:
 *                         type: string
 *                         description: Телефон пользователя.
 *                       theme:
 *                         type: string
 *                         description: тема.
 *                   chats:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID чата
 *                         name:
 *                           type: string
 *                           description: Имя чата
 *
 */
router.post('/get-user', async (req, res) => {
  let user = await getUserByLogin(req.user.login)
  if (user) {
    let settings = await getSettingsById(user.id_settings)
    user = {
      id: user.id,
      login: user.login,
      settings,
      chats: []
    }
  }
  return res.status(200).json({ user })
})
/**
 * @openapi
 * /users/get-chats:
 *   post:
 *     description: Получение списка чатов пользователя
 *     responses:
 *       200:
 *         description: Возвращает массив чатов.
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID чата
 *                     name:
 *                       type: string
 *                       description: Имя чата
 */
router.post('/get-chats', async (req, res) => {
  const chats = await getUserChats(req.user.login)
  return res.status(200).json(chats)
})
/**
 * @openapi
 * /users/logout:
 *   post:
 *     description: выход пользователя
 *     responses:
 *       200:
 *         description: возвращает сообщение.
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.post('/logout', async (req, res) => {
  await removeActiveUser(req.user)
  return res.status(200).json({ message: 'ok' })
})

export default router
