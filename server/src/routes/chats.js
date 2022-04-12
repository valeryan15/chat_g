import express, { Router } from 'express'
import { body, validationResult } from 'express-validator'
import authMiddleware from '../middleware/auth.middleware'
import { v4 as uuidv4 } from 'uuid'
import { getUserByIdFull } from '../database-function/users.function'
import { createChat } from '../database-function/chats.function'
import { ServerError } from '../models/ServerError'

const router = Router()

router.use(express.json())
router.use(authMiddleware)

/**
 * @openapi
 * /chats/create-chat:
 *   post:
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID пользователя
 *    description: Создание чата
 *    responses:
 *      200:
 *        description: что-то возвращает
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: ID чата
 *                members:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: Login пользователя
 *                messages:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: TODO структуру продумать
 */
router.post(
  '/create-chat',
  body('id').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const currentUser = req.user
    const selectUser = await getUserByIdFull(req.body.id)
    if (selectUser.chats.some(chat => chat.name === currentUser.login)) {
      const error = new ServerError({
        location: 'chats',
        msg: 'Chat for these users already exists',
      })
      return res.status(400).json({ errors: [error] })
    } else {
      let chat = {
        id: uuidv4(),
        members: {
          [currentUser.login]: true,
          [selectUser.login]: true
        },
        messages: {}
      }
      await createChat(chat, currentUser.login, selectUser.login)
      chat.members = Object.keys(chat.members) || []
      return res.status(200).json({ chat })
    }
  }
)

export default router
