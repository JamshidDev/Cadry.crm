import axios from "../index";


const get_Tabels = (payload)=>{
    return axios.get(`/api/tabel/cadries`, {params:payload})
}
const create_Tabels = (payload)=>{
    return axios.post(`/api/tabel/create`, payload.data)
}
const dowload_Tabels = (payload)=>{
    return axios.get(`/api/tabel/export?year=${payload.year}&month=${payload.month}`,{ responseType: 'blob' })
}



export default {get_Tabels, create_Tabels, dowload_Tabels}
