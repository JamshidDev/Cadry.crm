// import Vue from "vue";
import Vuex from 'vuex';

import adminModules from './Modules/adminModules';
import appModules from './Modules/appModules';
import factoryModule from './Modules/factoryModule';
import offerModule from './Modules/offerModule';
import searchModule from './Modules/searchModule';
import skillModules from './Modules/skillModules';
import statisticModule from './Modules/statisticModule';
import tabelModule from './Modules/tabelModule';
import ViewStatisticModule from './Modules/ViewStatisticModule';

// Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appModules,
    adminModules,
    statisticModule,
    ViewStatisticModule,
    searchModule,
    factoryModule,
    skillModules,
    tabelModule,
    offerModule,
  },
});