import axios from '../index';

const get_log_admin = (payload)=>{
    return axios.get(`/api/admin/authentication-log`, {params:payload})
}

export default{get_log_admin}