import axios from "../index";


const get_Tabels = (payload)=>{
    return axios.get(`/api/tabel/cadries`, {params:payload})
}

export default {get_Tabels}
