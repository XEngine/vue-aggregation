<template>
    <div class="sidebarBlock" v-if="aggregations.buckets && aggregations.buckets.length">
        <h5 class="sidebarBlock-heading">{{name}}</h5>
        <ul class="navList">
            <li class="navList-item" v-for="bucket in aggregations.buckets" v-if="bucket.doc_count > 0">
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
</template>

<script>
    import {mapGetters} from 'vuex'
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
        }
    }
</script>