const state = {
  appScrollX: 0,
  appScrollY: 0,
  screenWidth: window.innerWidth,
  screenHeight:  window.innerHeight,
  activeHorizantal: JSON.parse(localStorage.getItem("menu")) || false,
  activeSidebar: JSON.parse(localStorage.getItem("sidebar")) || false,
  page: 1,
  per_page: 10,
  isDark: JSON.parse(localStorage.getItem("theme-dark")) || false,
};
const getters = {
  get_appScrollX(state) {
    return state.appScrollX;
  },
  get_appScrollY(state) {
    return state.appScrollY;
  },
  get_screenWidth(state) {
    return state.screenWidth;
  },
  get_screenHeight(state) {
    return state.screenHeight;
  },
  get_menuType(state) {
    return state.activeHorizantal;
  },
  get_Sidebar(state) {
    return state.activeSidebar;
  },
  get_darkTheme(state) {
    return state.isDark;
  },
};

const actions = {
  set_appScrollX(ctx, payload) {
    ctx.commit("update_appScrollX", payload);
  },
  set_appScrollY(ctx, payload) {
    ctx.commit("update_appScrollY", payload);
  },
  set_screenWidth(ctx, payload) {
    ctx.commit("update_screenWidth", payload);
  },
  set_screenHeight(ctx, payload) {
    ctx.commit("update_screenHeight", payload);
  },
  actionMenu(ctx, payload) {
    localStorage.setItem("menu", JSON.stringify(payload));
    ctx.commit("update_Menu", payload);
  },
  actionSidebar(ctx, payload) {
    localStorage.setItem("sidebar", JSON.stringify(payload));
    ctx.commit("update_Sidebar", payload);
  },
  actionisDark(ctx, payload) {
    ctx.commit("update_isDark", payload);
  },
};

const mutations = {
  update_appScrollX(state, item) {
    state.appScrollX = item;
  },
  update_appScrollY(state, item) {
    state.appScrollY = item;
  },
  update_screenWidth(state, item) {
    state.screenWidth = item;
  },
  update_screenHeight(state, item) {
    state.screenHeight = item;
  },
  update_Menu(state, item) {
    state.activeHorizantal = item;
  },
  update_Sidebar(state, item) {
    state.activeSidebar = item;
  },
  update_isDark(state, item) {
    state.isDark = item;
  },
};

export default { state, actions, getters, mutations };
