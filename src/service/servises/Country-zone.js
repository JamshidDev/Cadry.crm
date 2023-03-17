import axios from "../index";

const get_Regions = (payload)=>{
    return axios.get(`/api/organization/regions`, {params:payload})
}

const update_Regions = (payload)=>{
    return axios.put(`/api/organization/region/${payload.region_id}/update`, payload.data)
}

const create_Regions = (payload)=>{
    return axios.post(`/api/organization/region/create`, payload.data)
}

const delete_Regions = (payload)=>{
    return axios.delete(`/api/organization/region/${payload.region_id}/delete`)
}


const get_District = (payload)=>{
    return axios.get(`/api/organization/${payload.region_id}/cities`,{params:payload.params} )
}

const update_District = (payload)=>{
    return axios.put(`/api/organization/city/${payload.city_id}/update`, payload.data)
}

const create_District = (payload)=>{
    return axios.post(`/api/organization/city/create`, payload.data)
}

const delete_District= (payload)=>{
    return axios.delete(`/api/organization/city/${payload.city_id}/delete`)
}








export default {get_Regions, update_Regions, create_Regions, delete_Regions, get_District, update_District, create_District, delete_District }