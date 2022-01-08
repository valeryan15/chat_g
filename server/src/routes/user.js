import { Router } from "express"
const users = {
  1: {
    id: 1,
    name: 'Johan'
  },
  2: {
    id: 2,
    name: 'Mike'
  },
}
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
router.get('/', (req, res) => {
  return res.send(Object.values(users));
});
/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the user to get
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/:userId', (req, res) => {
  return res.send(users[req.params.userId])
})

export default router;
