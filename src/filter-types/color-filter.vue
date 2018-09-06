<template>
    <div class="sidebarBlock" v-if="aggregations.buckets && aggregations.buckets.length > 1">
        <h5 class="sidebarBlock-heading">{{name}}</h5>
        <ul class="navList">
            <li class="navList-item" v-for="bucket in aggregations.buckets">
                <input v-on:change="toggleChecked(bucket.key, $event)"
                       :checked="selectedAggs[bucket.key] || false"
                       class="form-checkbox"
                       :id="bucket.key"
                       type="checkbox">
                <label class="form-label optimizedCheckout-form-label" :for="bucket.key">
                    {{bucket.key}} ({{bucket.doc_count}}) {{selectedAggs[bucket.key]}}
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
            'size'
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
            toggleChecked: async function (key, event) {
                const checked = event.target.checked
                await this.$store.dispatch('filter/checkItems', {field: this.field, key: key, set: checked})
            },
        }
    }
</script>