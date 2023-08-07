import axios from "../index";

const notefication_list = (payload)=>{
    return axios.get(`/api/deadline/notific`, {params:payload})
}


export default {notefication_list }