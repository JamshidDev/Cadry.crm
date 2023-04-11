import axios from '../index';

const commander_info = (payload)=>{
    return axios.get(`/api/cadry/commander/info`, payload)
}

const add_commander = (payload)=>{
    return axios.post(`/api/cadry/commander/create/${payload.cadry_id}`, payload.data)
}

const commander_cadry = (payload)=>{
    return axios.get(`/api/cadry/commanders`)
}

const delete_commander = (payload)=>{
    return axios.delete(`/api/cadry/commander/${payload.commander_id}/delete`)
}




export default {commander_info,add_commander, commander_cadry, delete_commander}