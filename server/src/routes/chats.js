import express, { Router } from 'express'
import { body, validationResult } from 'express-validator'
import authMiddleware from '../middleware/auth.middleware'
import { v4 as uuidv4 } from 'uuid'
import { getUserById } from '../database-function/users.function'
import { createChat } from '../database-function/chats.function'

const router = Router()

router.use(express.json())
router.use(authMiddleware)

router.post(
  '/create-chat',
  body('id').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const currentUser = req.user
    const selectUser = await getUserById(req.body.id)
    let chat = {
      id: uuidv4(),
      members: {
        [currentUser.login]: true,
        [selectUser.login]: true
      },
      messages: {}
    }
    await createChat(chat, currentUser.login, selectUser.login)
    return res.status(200).json({ chat })
  }
)

export default router
