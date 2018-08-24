import Vue from 'vue'
import qs from 'qs'
import axios from '@/util/axios'
import router from '@/router'
import config from "../../config";

const state = {
    aggregations: {},
    hits: [],
    selectedItems: {},
    selectedAggs: {},
    cardinality: {},
    sort: false,
    page: false,
    filters: config.filters,
    collapsibleToggle: null
}

// getters
const getters = {
    getAggregationByField: (state) => field => {
        const key = state.aggregations[field]
        const result = {}

        if (!key || !key[field])
            return []

        result.buckets = key[field].buckets
        result.cardinality = key[field + '_count'].value

        return result;
    },
    getHits: state => state.hits,
    getFilters: state => state.filters,
    getSort: state => state.sort,
    getPage: state => state.page,
    getSelectedItems: state => {
        const result = {}
        for (let k in state.selectedItems) {
            result[k] = Object.keys(state.selectedItems[k]).filter(function (selectedItem) {
                return state.selectedItems[k][selectedItem]
            })
        }
        return result
    },
    getCardinalityByField: state => field => state.cardinality[field],
    getSelectedItemsByField: (state) => field => state.selectedItems[field]
}

// actions
const actions = {
    execute: async function ({commit, state}, payload) {
        const {data} = await axios.post('', payload)
        commit('setExecuteResults', {...data})
    },
    checkItems: async function ({commit, state}, payload) {
        commit('setItems', payload)
    },
    incrementCardinalityByField: async function ({commit, state, dispatch}, payload) {
        commit('setCardinality', payload)
    },
    changePage: async function ({commit, state}, payload) {
        commit('setPage', payload)
    },
    changeSort: async function ({commit, state}, payload) {
        commit('setSort', payload)
    },
    toggleCollapse: async function ({commit, state}, payload) {
        commit('setActiveCollapse', payload)
    }
}
// mutations
const mutations = {
    setExecuteResults: function (state, payload) {
        state.aggregations = payload.aggregations
        state.hits = payload.hits

        const queryItems = router.app.$route.query
        const result = {}
        for (let k in queryItems) {
            const filterFromQuery = config.filters.find(f => {
                return f.field === k
            })
            if (!filterFromQuery)
                continue

            if (typeof queryItems[k] === 'string') {
                result[k] = {}
                result[k][queryItems[k]] = true
            } else {
                result[k] = {}
                queryItems[k].forEach(aggregation => {
                    result[k][aggregation] = true
                })
            }
        }
        state.selectedItems = Object.assign({}, result)
    },
    setItems: function (state, payload) {
        const previousState = state.selectedItems
        if (!previousState[payload.field]) {
            previousState[payload.field] = {}
        }
        previousState[payload.field][payload.key] = payload.set
        state.selectedItems = Object.assign({}, previousState)
    },
    setSort: function (state, payload) {
        state.sort = payload
    },
    setPage: function (state, payload) {
        state.page = payload
    },
    setCardinality: function (state, payload) {
        state.cardinality = Object.assign({}, state.cardinality, {[payload.field]: payload.cardinality})
    },
    setActiveCollapse: (state, payload) => state.collapsibleToggle = payload
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}