const users = []

const addUser = ({ id, name, room }) => {
    if (users.find(user => user.room === room && user.name === name)) {
        throw new Error("В комнате уже есть пользователь с таким именем!")
    }
    if (!name || !room) {
        throw new Error("нужно ввести имя и название комнаты!")
    }
    users.push({ id, name, room })
    return { id, name, room }
}

const removeUser = (id) => {
    return users.filter(user => user.id !== id)
}

const getUser = (id) => {
    return users.find(user => user.id === id)
}

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room)
}

module.exports = { getUser, getUsersInRoom, addUser, removeUser }