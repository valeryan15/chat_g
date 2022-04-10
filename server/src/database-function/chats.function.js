import db, { DatabaseUrlChats } from '../database'
import { addChatToUser } from './users.function'

export async function createChat(chat, login1, login2) {
  const ref = db.ref(DatabaseUrlChats)
  await ref.child(chat.id).set(chat)
  await addChatToUser(login1, chat.id, login2)
  await addChatToUser(login2, chat.id, login1)
  return true
}
