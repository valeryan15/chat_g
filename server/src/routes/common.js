import db from '../database'
import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { v4 as uuidv4 } from 'uuid'
import { ServerError } from '../models/ServerError'
import jwt from 'jsonwebtoken'
import { tokenKey } from '../constants'
import { addActiveUser } from '../realtime-data/active-users'

const router = Router()
const DatabaseUrlUsers = 'server/users'

/**
 * @openapi
 * /common/sign-up:
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
    .withMessage(
      'must contain only latin characters, symbols "-", "_" and numbers'
    )
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
    .withMessage(
      'must contain only latin characters, symbols "-", "_" and numbers'
    ),
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
 * /common/sign-in:
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
 *    description: Авторизация пользователя
 *    responses:
 *      200:
 *        description: что-то возвращает
 */
router.post(
  '/sign-in',
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
    .withMessage(
      'must contain only latin characters, symbols "-", "_" and numbers'
    )
    .custom(async (value) => {
      const ref = db.ref(DatabaseUrlUsers)
      const child = await ref.child(value).once('value')
      if (!child.exists()) {
        return Promise.reject('Login or password is incorrect')
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
    .withMessage(
      'must contain only latin characters, symbols "-", "_" and numbers'
    ),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const ref = db.ref(`${DatabaseUrlUsers}/${req.body.login}`)
    let snapshot = await ref.once('value')
    const user = snapshot.val()
    if (user.password !== req.body.password) {
      const error = new ServerError({
        value: req.body.password,
        param: 'password',
        location: 'body',
        msg: 'Login or password is incorrect',
      })
      return res.status(400).json({ errors: [error] })
    }
    const token = jwt.sign({ id: user.id }, tokenKey)
    const userAuth = {
      id: user.id,
      login: user.login,
      token: token,
    }
    await addActiveUser(userAuth)
    return res.status(200).json(userAuth)
  }
)

export default router
