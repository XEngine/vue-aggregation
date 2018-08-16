import Vue from 'vue'
import Vuex from 'vuex'
import FilterModule from './modules/filter'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        filter : FilterModule
    },
})