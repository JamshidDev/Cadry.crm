import axios from '../index';

const commander_info = (payload)=>{
    return axios.get(`/api/cadry/commander/info`, payload)
}

const commander_accept = (payload)=>{
    return axios.get(`/api/cadry/commander/${payload.commander_id}/accept`)
}


const add_commander = (payload)=>{
    return axios.post(`/api/cadry/commander/create/${payload.cadry_id}`, payload.data)
}

const commander_cadry = (payload)=>{
    return axios.get(`/api/cadry/commanders`)
}

const edit_commander_cadry = (payload)=>{
    return axios.put(`/api/cadry/commander/${payload.commander_id}/update`, payload.data)
}

const delete_commander = (payload)=>{
    return axios.delete(`/api/cadry/commander/${payload.commander_id}/delete`)
}




export default {commander_info,add_commander, commander_cadry, delete_commander, edit_commander_cadry, commander_accept}