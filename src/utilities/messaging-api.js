import sendRequest from './send-request'
const BASE_URL = '/api/messaging'

export function getConvos() {
    return sendRequest(`${BASE_URL}/conversations`, 'GET')
}

export function createConvo() {
    return sendRequest(`${BASE_URL}/conversations`, 'POST')
}

export function removeConvo(convoId) {
    return sendRequest(`${BASE_URL}/${convoId}`, 'DELETE')
}

export function sendMsg(convoId, msgText) {
    console.log(msgText)
    console.log(`in the api`)
    const data = { message: msgText }
    return sendRequest(`${BASE_URL}/${convoId}`, 'PUT', data)
}
