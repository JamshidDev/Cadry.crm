import axios from '../index';

const get_candidate_info = (payload)=>{
    return axios.get(`/api/odas/reception/${payload}`)
}
const generate_reception_link = (payload)=>{
    return axios.post(`/api/cadry/slug/create`)
}

const add_condidate = (payload)=>{
    return axios.post(`/api/odas/reception/${payload.slug}`, payload.data)
}

const get_slug_cadries = (payload)=>{
    return axios.get(`/api/cadry/slug-cadries`)
}
const accept_slug_cadry = (payload)=>{
    return axios.post(`/api/cadry/slug/${payload.slug_cadry_id}/accept`, payload.data)
}
const delete_slug_cadries = (payload)=>{
    return axios.delete(`/api/cadry/slug/${payload.slug_cadry_id}/delete`)
}
const get_slug_cadries_info = (payload)=>{
    return axios.get(`/api/cadry/slug/${payload.slug_cadry_id}/view`)
}
const accept_slug = (payload)=>{
    return axios.get(`/api/cadry/slug/accept`)
}


export default{get_candidate_info, generate_reception_link, add_condidate, get_slug_cadries, accept_slug_cadry, delete_slug_cadries,get_slug_cadries_info, accept_slug}