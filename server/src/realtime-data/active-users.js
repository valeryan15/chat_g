import { open, writeFile, readFile } from 'fs/promises'

const fileActiveUsers = 'active-users.txt'

let ActiveUsers = []
async function addActiveUser(user) {
  const isUserFound = ActiveUsers.map(u => u.id === user.id)
  if (Boolean(isUserFound)) {
    ActiveUsers = ActiveUsers.filter((u) => u.id !== user.id)
  }
  ActiveUsers = [...ActiveUsers, user]
  await writeFileActiveUser(ActiveUsers)
  return true
}

async function removeActiveUser(deletedUser) {
  ActiveUsers = ActiveUsers.filter((u) => u.id !== deletedUser.id)
  await writeFileActiveUser(ActiveUsers)
  return true
}

function getActiveUserById(id) {
  return ActiveUsers.find((u) => u.id === id)
}

async function writeFileActiveUser(users = []) {
  let file = {}
  try {
    file = await open(fileActiveUsers, 'w')
    try {
      const usersString = JSON.stringify(users)
      await writeFile(file, usersString, {
        encoding: 'utf8',
      })
    } catch (e) {
      console.error('Error Write file', e)
    }
  } catch (err) {
    console.error('Error Open file', err)
  } finally {
    file.close()
  }
}

export async function readFileActiveUsers() {
  try {
    const data = await readFile(fileActiveUsers, {
      encoding: 'utf8',
    })
    if (data) {
      ActiveUsers = JSON.parse(data)
    }
  } catch (e) {
    console.error('Error Write file', e)
  }
}

export {
  ActiveUsers,
  addActiveUser,
  removeActiveUser,
  getActiveUserById,
}
