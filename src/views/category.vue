<template>
    <div v-if="hits.total">
        <sidebar/>
        <products/>
    </div>
</template>

<script>
    import Sidebar from "../components/sidebar"
    import Products from '../components/products'
    import {mapState, mapGetters} from 'vuex'

    export default {
        components: {Sidebar, Products},
        data() {
            return {}
        },
        computed: {
            ...mapState({
                hits: state => state.filter.hits
            }),
            ...mapGetters({
                getSelectedItems: 'filter/getSelectedItems',
                getSort: 'filter/getSort',
                getPage: 'filter/getPage'
            })
        },
        watch: {
            'getSelectedItems': function () {
                this.watchItems()
            },
            '$store.state.filter.cardinality': function () {
                this.prepare()
            },
            '$store.state.filter.sort': function () {
                this.watchItems()
            },
            '$store.state.filter.page': function () {
                this.watchItems()
            }
        },
        beforeRouteUpdate(to, from, next) {
            next()
            this.prepare()
        },
        async mounted() {
            this.prepare()
        },
        methods: {
            async prepare() {
                const query = this.$queryFactory.initialQuery()
                await this.$store.dispatch('filter/execute', query)
                if(this.hits.total){
                    document.getElementById('product-listing-container').style.display = 'none'
                }
            },
            async watchItems() {
                let sort = {}
                let page = {}
                if (this.getSort) {
                    sort = {sort: this.getSort.field + '_' + this.getSort.order}
                }
                if (this.getPage) {
                    page = {page: this.getPage}
                }
                this.$router.push({query: Object.assign({}, this.getSelectedItems, sort, page)})
            }
        }
    }
</script>