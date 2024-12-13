import { sendRequest } from "../request";
const BASE_URL = '/api/patents';



export function postPatentId(formData){
    return sendRequest(`${BASE_URL}/patentData`, "POST", formData, 'Invalid Patent ID');
}