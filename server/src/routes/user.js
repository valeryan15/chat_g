import { Router } from "express"
import db from "../database"
import { v4 as uuidv4 } from 'uuid'

const DatabaseUrlUsers = 'server/users'
const router = Router()
/**
 * @openapi
 * /users:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', async (req, res) => {
  const ref = db.ref(DatabaseUrlUsers);
  let snapshot = await ref.once('value');
  const users = snapshot.val() ? Object.values(snapshot.val()) : []
  return res.status(200).json(users);
});

/**
 * @openapi
 * /users:
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
 *    description: Добавление пользователя
 *    responses:
 *      200:
 *        description: что-то возвращает
 */

router.post('/', async (req, res) => {
  const ref = db.ref(DatabaseUrlUsers);
  const user = {
    ...req.body,
    id: uuidv4()
  }
  await ref.set({[user.login]: user})

  return res.status(200).json(user);
});

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
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/:login', async (req, res) => {
  const ref = db.ref(`${DatabaseUrlUsers}/${req.params.login}`);
  let snapshot = await ref.once('value');
  return res.status(200).json(snapshot.val());
})

export default router;
