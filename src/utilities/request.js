// import { getToken } from "./services/users";

export async function sendRequest(url, method ='GET', payload = null, error = 'Bad Request'){

    // intialize the options object
    const options = { method }

    if(payload){
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload)
    }

    // const token = getToken()

    // if(token){
    //     options.headers ||= {}
    //     options.headers.Authorization = `Bearer ${token}`
    // }

    const res = await fetch(url, options);

    if(res.ok) return res.json()

    throw new Error(error)}
