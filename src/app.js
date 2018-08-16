import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import QueryFactory from "./util/query-generator";

function init() {
    const searchContainer = document.getElementById('search-results-content')
    if (!window.categoryId && !!!searchContainer)
        return false

    const container = searchContainer ? document.getElementById('product-listing-container') : document.querySelector('.page')
    container.innerHTML = ''

    Vue.prototype.$queryFactory = new QueryFactory()

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount(container)

}

if (window.location.href.indexOf('opt7') > -1)
    init();





