import * as messagingAPI from './messaging-api'

export async function getConvos() {
    const convos = await messagingAPI.getConvos()
    return convos
}
