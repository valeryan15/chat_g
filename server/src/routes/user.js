import { Router } from 'express'
import db from '../database'
import { v4 as uuidv4 } from 'uuid'
import { body, validationResult } from 'express-validator'

const DatabaseUrlUsers = 'server/users'
const router = Router()
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
 * /users/sign-up:
 *   post:
 *    parameters:
 *         - in: path
 *           name: login
 *           schema:
 *             type: string
 *           required: true
 *           description: Логин пользователя
 *         - in: path
 *           name: password
 *           schema:
 *             type: string
 *           required: true
 *           description: Пароль пользователя
 *         - in: path
 *           name: passwordConfirmation
 *           schema:
 *             type: string
 *           required: true
 *           description: Пароль пользователя введенные повторно
 *    description: Добавление пользователя
 *    responses:
 *      200:
 *        description: что-то возвращает
 */

router.post(
  '/sign-up',
  body('login')
    .isLength({ max: 50 })
    .withMessage('must be no more than 50 chars')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .not()
    .matches(/\ /)
    .withMessage('there should be no spaces')
    .matches(/^[A-Za-z0-9\-\_]+$/)
    .withMessage('must contain only latin characters, symbols "-", "_" and numbers')
    .custom(async (value) => {
      const ref = db.ref(DatabaseUrlUsers)
      const child = await ref.child(value).once('value')
      if (child.exists()) {
        return Promise.reject('Such user already exists')
      }
    }),
  body('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')
    .not()
    .matches(/\ /)
    .withMessage('there should be no spaces')
    .matches(/^[A-Za-z0-9\-\_]+$/)
    .withMessage('must contain only latin characters, symbols "-", "_" and numbers'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }

    // Indicates the success of this synchronous custom validator
    return true
  }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const ref = db.ref(DatabaseUrlUsers)
    const user = {
      login: req.body.login,
      password: req.body.password,
      id: uuidv4(),
    }

    await ref.child(user.login).set(user)

    return res.status(200).json(user)
  }
)

/**
 * @openapi
 * /users/{login}:
 *   get:
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
 *         description: Returns a mysterious string.
 */
router.get('/:login', async (req, res) => {
  const ref = db.ref(`${DatabaseUrlUsers}/${req.params.login}`)
  let snapshot = await ref.once('value')
  return res.status(200).json(snapshot.val())
})

export default router
