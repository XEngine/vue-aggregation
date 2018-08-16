<template>
    <div class="sidebarBlock" v-if="selectedItems.length">
        <h5 class="sidebarBlock-heading">Selected Filters</h5>
        <ul class="navList">
            <li class="navList-item" v-for="item in selectedItems">
                <a v-on:click="clearSelected(item.rawTitle, item.rawValue)">
                    <i class="icon" aria-hidden="true">
                        <svg>
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </i>
                </a>
                <span>{{item.title}} : {{item.value}}</span>
            </li>
        </ul>
        <a v-on:click="clearAll">
            <button class="button button--primary button--small">Clear all</button>
        </a>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                getSelectedItems: 'filter/getSelectedItems',
                getSort: 'filter/getSort',
                getPage: 'filter/getPage',
                getFilters: 'filter/getFilters'
            }),
            selectedItems: function () {
                const selectedItems = []
                for (let k in this.getSelectedItems) {
                    const filterFromQuery = this.getFilters.find(f => {
                        return f.field === k
                    })
                    for (let ak in this.getSelectedItems[k]) {
                        const rawValue = this.getSelectedItems[k][ak]
                        let value = rawValue
                        if (filterFromQuery['keys']) {
                            const from = value.split('_')[0]
                            for (let k in filterFromQuery['keys']) {
                                if (from == filterFromQuery['keys'][k]['from']) {
                                    value = filterFromQuery['keys'][k]['key']
                                }
                            }
                        }
                        console.log(rawValue)
                        selectedItems.push({
                            title: k.replace('ProductFilters.', ''),
                            rawTitle: k,
                            value: value, //bucket.from + '_' + (bucket.to ||  '0')
                            rawValue: rawValue
                        })
                    }
                }
                return selectedItems
            }
        },
        methods: {
            clearSelected: async function (key, value) {
                let sort = {}
                let page = {}
                if (this.getSort) {
                    sort = {sort: this.getSort.field + '_' + this.getSort.order}
                }
                if (this.getPage) {
                    page = {page: this.getPage}
                }
                const currentQuery = this.getSelectedItems
                console.log(currentQuery)
                for (let k in currentQuery[key]) {
                    if (value === currentQuery[key][k]) {
                        currentQuery[key].splice(k, 1)
                    }
                }

                this.$router.push({query: Object.assign({}, currentQuery, sort, page)})
            },
            clearAll: function () {
                let sort = {}
                let page = {}
                if (this.getSort) {
                    sort = {sort: this.getSort.field + '_' + this.getSort.order}
                }
                if (this.getPage) {
                    page = {page: this.getPage}
                }
                this.$router.push({query: Object.assign({}, sort, page)})
            }
        }
    }
</script>