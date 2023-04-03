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

export default{get_candidate_info, generate_reception_link, add_condidate}