import db, { DatabaseUrlChats } from '../database'
import { addChatToUser, updateCountNewMessagesUserChat } from './users.function'

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
  const refChat = db.ref(`${DatabaseUrlChats}/${chatId}`)
  const refMembers = refChat.child(`members`)
  const refMessages = refChat.child(`messages`)
  const newMessageRef = refMessages.push()
  const snapshot = await refMembers.once('value')
  let read = {}
  let userReceivingMessage = ''
  for (const key of Object.keys(snapshot.val())) {
    if (user.login !== key) {
      userReceivingMessage = key
      read[key] = false
    } else {
      read[key] = true
    }
  }
  const m = {
    timestamp: +new Date(),
    message,
    user: {
      id: user.id,
      login: user.login,
    },
    read,
  }

  await newMessageRef.set(m)
  const snapshotM = await refMessages.once('value')
  const mapping = mappingMessages(snapshotM.val() || [])
  const countNewMessage = mapping.filter(
    (m) => !m.read[userReceivingMessage]
  ).length
  await updateCountNewMessagesUserChat(userReceivingMessage, chatId, countNewMessage)
  return m
}

export async function updateMessage(chatId, messageId, message) {
  const ref = db.ref(
    `${DatabaseUrlChats}/${chatId}/messages/${messageId}`
  )
  const snapshot = await ref.once('value')
  const oldMessage = snapshot.val()
  return ref.update({
    ...oldMessage,
    message,
  })
}

export async function getNewChatMessages(chat, login) {
  const ref = db.ref(
    `${DatabaseUrlChats}/${chat.id}/messages`
  )
  const snapshot = await ref.once('value')
  const mapping = mappingMessages(snapshot.val() || [])
  const newMessages = mapping.filter(
    (m) => !m.read[login]
  )
  return {
    chatId: chat.id,
    newMessages,
    countNewMessages: newMessages.length
  }
}

export function mappingChat(chat) {
  return {
    ...chat,
    members: Object.keys(chat.members),
    messages: mappingMessages(chat.messages || []),
  }
}

export function mappingMessages(messages) {
  let mappingMessages = []
  if (messages) {
    for (const key of Object.keys(messages)) {
      mappingMessages.push({ id: key, ...messages[key] })
    }
  }
  return mappingMessages
}
