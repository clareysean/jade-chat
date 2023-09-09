import { getToken } from './users-service'

export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc.
    const options = { method }

    const token = getToken()
    if (token) {
        // Ensure the headers object exists
        options.headers ||= {}
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`
    }

    if (payload instanceof FormData) {
        console.log(`yup file`)
        // If the payload is FormData, don't set 'Content-Type'
        options.body = payload
    } else if (payload) {
        // Check if options.headers exists, and if not, initialize it
        options.headers ||= {}
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(payload)
    }

    const res = await fetch(url, options)

    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json()
    throw new Error('Bad Request')
}

// export default async function sendRequest(url, method = 'GET', payload = null) {
//     // Fetch accepts an options object as the 2nd argument
//     // used to include a data payload, set headers, etc.
//     const options = { method }
//     if (payload) {
//         options.headers = { 'Content-Type': 'application/json' }
//         options.body = JSON.stringify(payload)
//     }
//     const token = getToken()
//     if (token) {
//         // Ensure the headers object exists
//         options.headers ||= {}
//         // Add token to an Authorization header
//         // Prefacing with 'Bearer' is recommended in the HTTP specification
//         options.headers.Authorization = `Bearer ${token}`
//     }
//     console.log(options)
//     const res = await fetch(url, options)
//     // res.ok will be false if the status code set to 4xx in the controller action
//     if (res.ok) return res.json()
//     throw new Error('Bad Request')
// }
