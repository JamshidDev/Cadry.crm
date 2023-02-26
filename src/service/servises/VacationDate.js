import axios from "../index";


const get_Vacation_Date = (payload)=>{
    return axios.get(`/api/organization/vacation-cadries`, {params:payload})
}

const create_Vacation_Date  = (payload)=>{
    return axios.post(`/api/organization/vacation-cadry/${payload.cadry_id}/create`, payload.data)
}

const update_Vacation_Date  = (payload)=>{
    return axios.put(`/api/organization/vacation-cadries/${payload.cadry_id}/update`, payload.data)
}

const delete_Vacation_Date  = (payload)=>{
    return axios.delete(`/api/organization/vacation-cadries/${payload.cadry_id}/delete`)
}

const get_Cadry_Vacation_Date = (payload)=>{
    return axios.get(`/api/organization/vacation-cadries/${payload.cadry_id}`,  {params:payload})
}



export default {get_Vacation_Date,create_Vacation_Date, get_Cadry_Vacation_Date, update_Vacation_Date, delete_Vacation_Date}