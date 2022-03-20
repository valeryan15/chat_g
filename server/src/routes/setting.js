import express, { Router } from 'express'
import db, { DatabaseUrlSettings } from '../database'
import { tokenKey } from '../constants'
import jwt from 'jsonwebtoken'
import { getActiveUserById } from '../realtime-data/active-users'
import { body, validationResult } from 'express-validator'

const router = Router()

router.use(express.json())
router.use((req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      tokenKey,
      (err, payload) => {
        if (err) {
          return res.status(401).json({ message: 'Not authorized' })
        } else if (payload) {
          const activeUser = getActiveUserById(payload.id)
          if (activeUser) {
            req.user = activeUser
            next()
          }

          if (!req.user)
            return res.status(401).json({ message: 'Not authorized' })
        }
      }
    )
  } else {
    next()
  }
})
/**
 * @openapi
 * /settings/update-theme:
 *   post:
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id настроек
 *         - in: path
 *           name: theme
 *           schema:
 *             type: string
 *           required: true
 *           description: имя темы
 *    description: Смена темы
 *    responses:
 *      200:
 *        description:  Возвращает обект настроек пользователя.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: ID настроек.
 *                name:
 *                  type: string
 *                  description: ФИО пользователя.
 *                phone:
 *                  type: string
 *                  description: Телефон пользователя.
 *                theme:
 *                  type: string
 *                  description: тема.
 */
router.post(
  '/update-theme',
  body('id').not().isEmpty(),
  body('theme').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const ref = db.ref(`${DatabaseUrlSettings}/${req.body.id}`)
    let snapshot = await ref.once('value')
    let settings = {
      ...snapshot.val(),
      theme: req.body.theme,
    }
    console.log(settings)
    await ref.update(settings)
    return res.status(200).json(settings)
  }
)

/**
 * @openapi
 * /settings/update-info:
 *   post:
 *    parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id настроек
 *         - in: path
 *           name: name
 *           schema:
 *             type: string
 *           required: true
 *           description: ФИО
 *         - in: path
 *           name: phone
 *           schema:
 *             type: string
 *           required: true
 *           description: телефон
 *    description: Смена темы
 *    responses:
 *      200:
 *        description: Возвращает обект настроек пользователя.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: ID настроек.
 *                name:
 *                  type: string
 *                  description: ФИО пользователя.
 *                phone:
 *                  type: string
 *                  description: Телефон пользователя.
 *                theme:
 *                  type: string
 *                  description: тема.
 */
router.post(
  '/update-info',
  body('id').not().isEmpty(),
  body('name').not().isEmpty(),
  body('phone').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const ref = db.ref(`${DatabaseUrlSettings}/${req.body.id}`)
    let snapshot = await ref.once('value')
    let settings = {
      ...snapshot.val(),
      name: req.body.name,
      phone: req.body.phone,
    }
    await ref.update(settings)
    return res.status(200).json(settings)
  }
)

export default router
