import sendRequest from './send-request'
const BASE_URL = '/api/users'

// Refactored code below
export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData)
}

export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}

export function getActiveUsers() {
    return sendRequest(`${BASE_URL}/all`, 'GET')
}

export function addUserToConvo(contactId, convoId) {
    return sendRequest(`${BASE_URL}/${contactId}/${convoId}`, 'PUT')
}

export function removeUserFromConvo(contactId, convoId) {
    return sendRequest(`${BASE_URL}/${convoId}/${contactId}`, 'DELETE')
}

export function uploadImage(data) {
    console.log(data)
    return sendRequest(`${BASE_URL}/upload`, 'POST', data)
}

export function deletePhoto(fileName) {
    return sendRequest(`${BASE_URL}/${fileName}`, 'DELETE')
}

export function getDisplayUser() {
    return sendRequest(`${BASE_URL}/user`, 'GET')
}
