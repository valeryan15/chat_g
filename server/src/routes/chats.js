import express, { Router } from 'express'
import { body, validationResult } from 'express-validator'
import authMiddleware from '../middleware/auth.middleware'
import { v4 as uuidv4 } from 'uuid'
import { getUserByIdFull } from '../database-function/users.function'
import {
  addMessageToChat,
  createChat,
  existChatById,
  getChat,
  mappingChat,
  updateMessage,
} from '../database-function/chats.function'
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
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: ID сообщения
 *                      message:
 *                        type: string
 *                        description: тело сообщения
 *                      user:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: ID пользователя
 *                          login:
 *                            type: string
 *                            description: Логин пользователя
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
    if (
      selectUser.chats.some((chat) => chat.name === currentUser.login)
    ) {
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
          [selectUser.login]: true,
        },
        messages: {},
      }
      await createChat(chat, currentUser.login, selectUser.login)
      return res.status(200).json(mappingChat(chat))
    }
  }
)

/**
 * @openapi
 * /chats/get-chat:
 *   post:
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID чата
 *    description: Получение чата
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
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: ID сообщения
 *                      message:
 *                        type: string
 *                        description: тело сообщения
 *                      user:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: ID пользователя
 *                          login:
 *                            type: string
 *                            description: Логин пользователя
 */
router.post(
  '/get-chat',
  body('id')
    .not()
    .isEmpty()
    .custom(async (value) => {
      const isExist = await existChatById(value)
      if (!isExist) {
        return Promise.reject('Chat does not exist')
      }
    }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const chat = await getChat(req.body.id)
    return res.status(200).json(chat)
  }
)

/**
 * @openapi
 * /chats/add-message:
 *   post:
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID чата
 *         - in: path
 *           name: message
 *           schema:
 *             type: string
 *           required: true
 *           description: Тело сообщения
 *    description: Добавить новое сообещение
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
 *                  description: ID сообщения
 *                message:
 *                  type: string
 *                  description: тело сообщения
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: ID пользователя
 *                    login:
 *                      type: string
 *                      description: Логин пользователя
 */
router.post(
  '/add-message',
  body('id')
    .not()
    .isEmpty()
    .custom(async (value) => {
      const isExist = await existChatById(value)
      if (!isExist) {
        return Promise.reject('Chat does not exist')
      }
    }),
  body('message').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const message = await addMessageToChat(
      req.body.id,
      req.user,
      req.body.message
    )
    return res.status(200).json(message)
  }
)

/**
 * @openapi
 * /chats/update-message:
 *   post:
 *    parameters:
 *         - in: path
 *           name: chatId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID чата
 *         - in: path
 *           name: messageId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID сообщения
 *         - in: path
 *           name: message
 *           schema:
 *             type: string
 *           required: true
 *           description: Тело сообщения
 *    description: Добавить новое сообещение
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
 *                  description: ID сообщения
 *                message:
 *                  type: string
 *                  description: тело сообщения
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: ID пользователя
 *                    login:
 *                      type: string
 *                      description: Логин пользователя
 */
router.post(
  '/update-message',
  body('chatId')
    .not()
    .isEmpty()
    .custom(async (value) => {
      const isExist = await existChatById(value)
      if (!isExist) {
        return Promise.reject('Chat does not exist')
      }
    }),
  body('messageId').not().isEmpty(),
  body('message').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    await updateMessage(
      req.body.chatId,
      req.body.messageId,
      req.body.message
    )
    return res.status(200).json({ success: true })
  }
)

export default router
