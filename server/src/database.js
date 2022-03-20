import { initializeApp, cert } from 'firebase-admin/app'
import { enableLogging, getDatabase } from 'firebase-admin/database'
const serviceAccount = require('../key-adminsdk.json')
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://chat-family-e0c1e.firebaseio.com',
})
enableLogging(false)
const DatabaseUrlUsers = 'server/users'
const DatabaseUrlSettings = 'server/settings'
const DatabaseUrlChats = 'server/chats'
const DatabaseUrlUserChats = 'server/user_chats'

export {
  DatabaseUrlUsers,
  DatabaseUrlSettings,
  DatabaseUrlChats,
  DatabaseUrlUserChats
}
export default getDatabase()
