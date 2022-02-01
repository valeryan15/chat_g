let ActiveUsers = []

function addActiveUser(user) {
  ActiveUsers = [...ActiveUsers, user]
  return true
}

function removeActiveUser(deletedUser) {
  ActiveUsers = ActiveUsers.filter((u) => u.id !== deletedUser.id)
  return true
}

function getActiveUserById(id) {
  return ActiveUsers.find((u) => u.id === id)
}

export {
  ActiveUsers,
  addActiveUser,
  removeActiveUser,
  getActiveUserById,
}
