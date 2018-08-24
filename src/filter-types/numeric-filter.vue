<template>
    <li class="filter-item" v-if="aggregations.buckets && aggregations.buckets.length">
        <button v-on:click="toggleCollapse">
            {{name}}
        </button>
        <div class="filter-dropdown" v-if="active === name">
            <ul>
                <li v-for="bucket in aggregations.buckets" v-if="bucket.doc_count > 0">
                    <input v-on:change="toggleChecked(bucket.to || 0, bucket.from, $event)"
                           :checked="selectedAggs[bucket.from + '_' + (bucket.to ||  '0')] || false"
                           class="form-checkbox"
                           :id="bucket.key"
                           type="checkbox">
                    <label class="form-label optimizedCheckout-form-label" :for="bucket.key">
                        {{bucket.key}} ({{bucket.doc_count}})
                    </label>
                </li>
            </ul>
        </div>
    </li>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import Checkbox from "../components/checkbox";

    export default {
        components: {Checkbox},
        props: [
            'name',
            'field',
            'operator',
            'size',
            'keys'
        ],
        data() {
            return {
                mutable_size: this.size,
                mutable_sort: 'count'
            }
        },
        computed: {
            ...mapGetters({
                getAggregations: 'filter/getAggregationByField',
                getSelectedItems: 'filter/getSelectedItemsByField'
            }),
            ...mapState({
                active: state => state.filter.collapsibleToggle
            }),
            aggregations: function () {
                return this.getAggregations(this.field) || null
            },
            selectedAggs: function () {
                return this.getSelectedItems(this.field) || {}
            }
        },
        methods: {
            toggleChecked: async function (to, from, event) {
                const checked = event.target.checked
                await this.$store.dispatch('filter/checkItems', {field: this.field, key: from + '_' + to, set: checked})
            },
            toggleCollapse: function () {
                if(this.active === this.name) {
                    this.$store.dispatch('filter/toggleCollapse', null)
                    return true
                }

                this.$store.dispatch('filter/toggleCollapse', this.name)
            }
        },
    }
</script>

