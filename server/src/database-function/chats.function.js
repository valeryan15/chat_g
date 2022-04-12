import db, { DatabaseUrlChats } from '../database'
import { addChatToUser } from './users.function'

export async function createChat(chat, login1, login2) {
  const ref = db.ref(DatabaseUrlChats)
  await ref.child(chat.id).set(chat)
  await addChatToUser(login1, chat.id, login2)
  await addChatToUser(login2, chat.id, login1)
  return true
}

export async function getChat(id) {
  const ref = db.ref(`${DatabaseUrlChats}/${id}`)
  let snapshot = await ref.once('value')
  return snapshot.val() ? mappingChat(snapshot.val()) : null
}

export async function existChatById(id) {
  const ref = db.ref(`${DatabaseUrlChats}/${id}`)
  const snapshot = await ref.once('value')
  return snapshot.exists()
}

export async function addMessageToChat(chatId, user, message) {
  const ref = db.ref(`${DatabaseUrlChats}/${chatId}/messages`)
  const newMessageRef = ref.push();
  const m = {
    timestamp: + new Date(),
    message,
    user: {
      id: user.id,
      login: user.login
    }
  }
  await newMessageRef.set(m)
  return m
}

export async function updateMessage(chatId, messageId, message) {
  const ref = db.ref(`${DatabaseUrlChats}/${chatId}/messages/${messageId}`)
  const snapshot = await ref.once('value')
  const oldMessage = snapshot.val()
  return ref.update({
    ...oldMessage,
    message
  })
}

export function mappingChat(chat) {
  let messages = []
  if (chat.messages) {
    for (const key of Object.keys(chat.messages)) {
      messages.push({id: key, ...chat.messages[key]})
    }
  }
  return {
    ...chat,
    members: Object.keys(chat.members),
    messages
  }
}
