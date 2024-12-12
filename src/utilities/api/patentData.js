import { sendRequest } from "../request";
const BASE_URL = '/api/patent';



export function postPatentId(formData){
    // console.log('Post from utils Api: ', formData)
    return sendRequest(`${BASE_URL}/patentId`, "post", formData);
}