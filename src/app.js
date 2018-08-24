import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import QueryFactory from "./util/query-generator"


function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}

function init() {
    const searchContainer = document.getElementById('search-results-content')
    if (!window.categoryId && !!!searchContainer)
        return false

    const container = document.getElementById('product-listing-container')
    let vueContainer = document.createElement('div')
    insertBefore(vueContainer, container)

    Vue.prototype.$queryFactory = new QueryFactory()


    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount(vueContainer)

}

init();





