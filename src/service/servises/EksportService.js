import axios from '../index';

// user resume details request
const get_ResumeDetails = (payload)=>{
    return axios.get(`/api/cadry/ExportToWord/${payload.id}`)
}

const get_exportAnyDetails = (payload)=>{
    return axios.get(`/api/organization/cadry/ExportToExcel`, {params:payload})
}

const get_Cadry_Resume = (payload)=>{
    return axios.get(`/api/cadry/download/resume/${payload.id}`, { responseType: 'blob' })
}
const get_cadryZip = (payload)=>{
    return axios.get(`/api/cadry/ExportCadriesToWord`, {params:payload})
}

const get_Task = (payload)=>{
    return axios.get(`/api/user/tasks`, {params:payload})
}

const delete_Task = (payload)=>{
    return axios.delete(`/api/user/task/${payload.task_id}/delete`)
}

// /api/cadry/export/department
const export_department = (payload)=>{
    return axios.get(`/api/cadry/export/department`, { responseType: 'blob' })
}







export default {get_ResumeDetails,get_Cadry_Resume, get_exportAnyDetails, get_cadryZip,get_Task,delete_Task,export_department}