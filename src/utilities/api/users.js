import { sendRequest } from "../request";
const BASE_URL = '/api/users';


export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}

export function signUp(userData){
    return sendRequest(BASE_URL, "POST", userData, 'Invalid Sign Up')
}


export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, "POST", credentials, 'Invalid Credentials')
}


