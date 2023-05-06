import axios from '../index';

const get_Turnicateds = (payload)=>{
    return axios.get(`/api/cadry/turnicet`, {params:payload})
}

export default {get_Turnicateds }