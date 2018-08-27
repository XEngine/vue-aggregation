<template>
    <li class="filter-item" v-if="aggregations.buckets && aggregations.buckets.length"
        :class="{'open': active === name}">
        <button v-on:click="toggleCollapse">
            {{name}}
        </button>
        <div class="filter-dropdown" v-if="active === name">
            <ul>
                <li v-for="bucket in aggregations.buckets">
                    <input v-on:change="toggleChecked(bucket.key, $event)"
                           :checked="selectedAggs[bucket.key] || false"
                           class="form-checkbox"
                           :id="bucket.key"
                           type="checkbox">
                    <label class="form-label optimizedCheckout-form-label" :for="bucket.key">
                        {{bucket.key}} ({{bucket.doc_count}})
                    </label>
                </li>
                <li v-on:click="toggleCardinality(field)" v-if="size < aggregations.cardinality">
                    <span v-if="this.cardinality === this.aggregations.cardinality">Show less...</span>
                    <span v-else>Show more...</span>
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
        ],
        data() {
            return {
                mutable_size: this.size,
                mutable_sort: 'count',
            }
        },
        computed: {
            ...mapGetters({
                getAggregations: 'filter/getAggregationByField',
                getSelectedItems: 'filter/getSelectedItemsByField',
                getCardinalityByField: 'filter/getCardinalityByField'
            }),
            ...mapState({
                active: state => state.filter.collapsibleToggle
            }),
            cardinality: function () {
                return this.getCardinalityByField(this.field)
            },
            aggregations: function () {
                return this.getAggregations(this.field) || null
            },
            selectedAggs: function () {
                return this.getSelectedItems(this.field) || {}
            }
        },
        methods: {
            toggleChecked: async function (key, event) {
                const checked = event.target.checked
                await this.$store.dispatch('filter/checkItems', {field: this.field, key: key, set: checked})
            },
            toggleCardinality: async function (field) {
                await this.$store.dispatch('filter/incrementCardinalityByField', {
                    field: field,
                    cardinality: this.cardinality === this.aggregations.cardinality ? this.size : this.aggregations.cardinality
                })
            },
            toggleCollapse: function () {
                if (this.active === this.name) {
                    this.$store.dispatch('filter/toggleCollapse', null)
                    return true
                }

                this.$store.dispatch('filter/toggleCollapse', this.name)
            }
        }
    }
</script>
