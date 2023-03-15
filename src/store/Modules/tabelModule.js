
const state = {
    tabel_days: [],
    category_list: [],
    category_val: null,
    cadry_list: [],

}

const getters = {
    get_tabel_days(state) {
        return state.tabel_days;
    },
    get_category_list(state) {
        return state.category_list;
    },
    get_cadry_list(state) {
        return state.cadry_list;
    },
    get_category_val(state) {
        return state.category_val;
    },
}

const actions = {

    set_tabel_days(ctx, payload) {
        ctx.commit("update_tabel_days", payload)
    },
    set_category_list(ctx, payload) {
        ctx.commit("update_category_list", payload)
    },
    set_cadry_list(ctx, payload) {
        ctx.commit("update_cadry_list", payload)
    },
    set_category_val(ctx, payload) {
        ctx.commit("update_category_val", payload)
    },
    set_tabel(ctx, payload){
        ctx.commit("update_tabel", payload)
    }

}

const mutations = {
    update_tabel_days(state, item) {
        state.tabel_days = item;
    },
    update_category_list(state, item) {
        state.category_list = item;
    },
    update_cadry_list(state, item) {
        state.cadry_list = item;
    },
    update_category_val(state, item) {
        state.category_val = item;
    },
    update_tabel(state, {cadry_index, day_index, category_id,work_time }){
        state.cadry_list[cadry_index].days[day_index].category_id = category_id;
        state.cadry_list[cadry_index].days[day_index].work_time = work_time;
        console.log(category_id);
        console.log(state.cadry_list[cadry_index].days[day_index]);
    }
}

export default { state, getters, actions, mutations }