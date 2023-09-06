import * as usersAPI from './users-api'

export function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem('token')
    if (!token) return null
    // Obtain the payload of the token

    const payload = JSON.parse(atob(token.split('.')[1]))

    // Now you can access properties from the token payload using tokenPayloadJSON
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        // Token has expired - remove it from localStorage
        localStorage.removeItem('token')
        return null
    }
    return token
}

export function getUser() {
    const token = getToken()

    return token ? JSON.parse(atob(token.split('.')[1])).user : null
    // token is an encrypted string which represends a json object which containes a user key. atob is the decode util
}

export async function getActiveUsers() {
    const activeUsers = await usersAPI.getActiveUsers()
    return activeUsers
}

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials)
    localStorage.setItem('token', token)
    return getUser()
}

export async function checkToken() {
    const dateStr = await usersAPI.checkToken()
    return new Date(dateStr)
}

export async function addUserToConvo(contactId, convoId) {
    const addedUser = await usersAPI.addUserToConvo(contactId, convoId)
    return addedUser
}
