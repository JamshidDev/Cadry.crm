import axios from '../index';

const get_Deadlines = (payload)=>{
    return axios.get(`/api/deadline/cadries`, {params:payload.params})
}







export default {get_Deadlines}