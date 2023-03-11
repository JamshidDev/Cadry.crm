
const state = {
    tabel_days: [],
    category_list: [],
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

}

export default { state, getters, actions, mutations }