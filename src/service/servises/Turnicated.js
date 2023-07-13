import axios from '../index';

const get_Turnicateds = (payload)=>{
    return axios.get(`/api/cadry/turnicet`, {params:payload})
}
const dowload_Turnicateds = (payload)=>{
    return axios.get(`/api/cadry/turnicet/download`, {params:payload, responseType: 'blob'})
}


export default {get_Turnicateds, dowload_Turnicateds }