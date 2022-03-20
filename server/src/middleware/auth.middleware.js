import jwt from 'jsonwebtoken'
import { tokenKey } from '../constants'
import { getActiveUserById } from '../realtime-data/active-users'

async function authMiddleware(req, res, next) {
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
}

export default authMiddleware
