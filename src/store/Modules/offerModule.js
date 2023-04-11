

const state = {

    candidate_relatives: localStorage.getItem('candidate_relatives')? JSON.parse(localStorage.getItem('candidate_relatives')):[],
    candidate_careers: localStorage.getItem('candidate_careers')? JSON.parse(localStorage.getItem('candidate_careers')):[],
    candidate_form1: localStorage.getItem('candidate_form1')? JSON.parse(localStorage.getItem('candidate_form1')):{
        firt_name: null,
        last_name: null,
        third_name: null,
        birthdate: null,
        birth_regoin: null,
        birth_city: null,
        live_region: null,
        live_city: null,
        live_adress: null,
        nationality: null,
        passport_seriya: null,
        passport_jshr: null,
        passport_region: null,
        passport_city: null,
        passport_date: null,
    },
    candidate_picture:null,
    candidate_form2:localStorage.getItem('candidate_form2')? JSON.parse(localStorage.getItem('candidate_form2')):{
        academy: null,
        academy_degree: null,
        academy_title: null,
        languages: null,
        party: null,
        military_rank: "yo'q",
        organ: "yo'q",
        email: null,
    },
    select_infos: null,
    candidate_academy: localStorage.getItem('candidate_academy')? JSON.parse(localStorage.getItem('candidate_academy')):[],
}

const getters = {
    get_candidate_relatives(state) {
        return state.candidate_relatives;
    },
    get_candidate_careers(state) {
        return state.candidate_careers;
    },
    get_candidate_form1(state) {
        return state.candidate_form1;
    },
    get_candidate_form2(state) {
        return state.candidate_form2;
    },

    get_select_infos(state) {
       return state.select_infos;
    },
    get_candidate_academy(state) {
        return state.candidate_academy;
    },

    get_candidate_picture(state) {
        return state.candidate_picture;
    },

}

const actions = {
    set_candidate_relatives(ctx, payload) {
        ctx.commit('update_candidate_relatives', payload)
    },
    set_candidate_relatives_edit(ctx, payload) {
        ctx.commit('update_candidate_relatives_edit', payload)
    },
    set_candidate_relatives_delete(ctx, payload) {
        ctx.commit('update_candidate_relatives_delete', payload)
    },

    set_candidate_careers(ctx, payload) {
        ctx.commit('update_candidate_careers', payload)
    },
    set_candidate_careers_edit(ctx, payload) {
        ctx.commit('update_candidate_careers_edit', payload)
    },
    set_candidate_careers_delete(ctx, payload) {
        ctx.commit('update_candidate_careers_delete', payload)
    },



    set_candidate_form1(ctx, payload) {
        ctx.commit("update_candidate_form1", payload)
    },
    set_candidate_form2(ctx, payload) {
        ctx.commit("update_candidate_form2", payload)
    },
    set_select_infos(ctx, payload){
        ctx.commit("update_select_infos", payload)
    },


    set_candidate_academy(ctx, payload) {
        ctx.commit('update_candidate_academy', payload)
    },
    set_candidate_academy_edit(ctx, payload) {
        ctx.commit('update_candidate_academy_edit', payload)
    },
    set_candidate_academy_delete(ctx, payload) {
        ctx.commit('update_candidate_academy_delete', payload)
    },


    set_candidate_picture(ctx, payload) {
        ctx.commit('update_candidate_picture', payload)
    },
}

const mutations = {
    update_candidate_relatives(state, item) {
        state.candidate_relatives.push(item);
        localStorage.setItem('candidate_relatives', JSON.stringify(state.candidate_relatives))
    },
    update_candidate_relatives_edit(state, item) {
        state.candidate_relatives[item.index] = item;
        localStorage.setItem('candidate_relatives', JSON.stringify(state.candidate_relatives))

    },
    update_candidate_relatives_delete(state, index) {
        let new_list = state.candidate_relatives.filter((item) => item.index !== index);
        state.candidate_relatives = new_list;
        localStorage.setItem('candidate_relatives', JSON.stringify(state.candidate_relatives))
    },

    update_candidate_careers(state, item) {
        state.candidate_careers.push(item);
        localStorage.setItem('candidate_careers', JSON.stringify(state.candidate_careers))
    },
    update_candidate_careers_edit(state, item) {
        state.candidate_careers[item.index] = item;
        localStorage.setItem('candidate_careers', JSON.stringify(state.candidate_careers))
    },
    update_candidate_careers_delete(state, index) {
        let new_list = state.candidate_careers.filter((item) => item.index !== index);
        state.candidate_careers = new_list;
        localStorage.setItem('candidate_careers', JSON.stringify(state.candidate_careers))
    },




    update_candidate_form1(state, item) {
        state.candidate_form1 = item;
        localStorage.setItem('candidate_form1', JSON.stringify(state.candidate_form1))

    },
    update_candidate_form2(state, item) {
        state.candidate_form2 = item;
        localStorage.setItem('candidate_form2', JSON.stringify(state.candidate_form2))
    },
    update_select_infos(state, item){
        state.select_infos = item;
    },

    update_candidate_academy(state, item) {
        state.candidate_academy.push(item);
        localStorage.setItem('candidate_academy', JSON.stringify(state.candidate_academy))
    },
    update_candidate_academy_edit(state, item) {
        state.candidate_academy[item.index] = item;
        localStorage.setItem('candidate_academy', JSON.stringify(state.candidate_academy))
    },
    update_candidate_academy_delete(state, index) {
        let new_list = state.candidate_academy.filter((item) => item.index !== index);
        state.candidate_academy = new_list;
        localStorage.setItem('candidate_academy', JSON.stringify(state.candidate_academy))
    },

    update_candidate_picture(state, item) {
        state.candidate_picture = item;
        
    },

}

















export default { state, actions, getters, mutations };
