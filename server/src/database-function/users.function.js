import db, { DatabaseUrlUsers } from '../database'
import { addSettings } from './settings.function'
import { getNewChatMessages } from './chats.function'

export async function getUserById(id) {
  let user = await getUserByIdFull(id)
  if (user) {
    return { id: user.id, login: user.login }
  }
  return null
}

export async function getUserByLogin(login) {
  const ref = db.ref(`${DatabaseUrlUsers}/${login}`)
  let snapshot = await ref.once('value')
  let user = snapshot.val()
  return mappingFullUser(user)
}

export async function getUsers() {
  const ref = db.ref(`${DatabaseUrlUsers}`)
  let snapshot = await ref.once('value')
  const users = snapshot.val() ? Object.values(snapshot.val()) : []
  return users.map(mappingFullUser)
}

export async function getUserByIdFull(id) {
  const users = await getUsers()
  return users.find(u => u.id === id)
}

export async function addUser(user, settings) {
  const ref = db.ref(DatabaseUrlUsers)
  await ref.child(user.login).set(user)
  return addSettings(settings)
}

export async function addChatToUser(login, chatId, name) {
  const ref = db.ref(`${DatabaseUrlUsers}/${login}/chats`)
  let snapshot = await ref.once('value')
  let chats =  snapshot.val() ? snapshot.val() : {}
  chats = {
    ...chats,
    [chatId]: {
      id: chatId,
      name
    }
  }
  return await ref.update(chats)
}

export async function updateCountNewMessagesUserChat(login, chatId, countNewMessages = 0) {
  const ref = db.ref(`${DatabaseUrlUsers}/${login}/chats/${chatId}`)
  let snapshot = await ref.once('value')
  let chat =  snapshot.val() ? snapshot.val() : {}
  chat = {
    ...chat,
    countNewMessages
  }
  return await ref.update(chat)
}

export async function existUser(login) {
  const ref = db.ref(`${DatabaseUrlUsers}/${login}`)
  const snapshot = await ref.once('value')
  return snapshot.exists()
}

/**
 * @param login {string}
 * @returns {Promise<{id: string, name: string}[]|[]>}
 */
export async function getUserChats(login) {
  const user = await getUserByLogin(login)
  const chats = user.chats ? Object.values(user.chats) : []
  return chats.map(chat => {
    return {
      ...chat,
      countNewMessages: chat.countNewMessages ? chat.countNewMessages : 0
    }
  })
}

export async function getNewUserChatMessages(login) {
  const chats = await getUserChats(login)
  let promises = []
  for (const chat of chats) {
    if(chat.countNewMessages) {
      promises.push(getNewChatMessages(chat, login))
    }
  }
  return Promise.all(promises)
}

function mappingFullUser(user) {
  return {
    ...user,
    chats: user.chats ? Object.values(user.chats) : []
  }
}
