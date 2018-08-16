<template>
    <div class="sidebarBlock" v-if="aggregations.buckets && aggregations.buckets.length">
        <h5 class="sidebarBlock-heading">{{name}}</h5>
        <div class="navList">
            <template v-for="bucket in aggregations.buckets">
                <input v-on:change="toggleChecked(bucket.key, $event)"
                       :checked="selectedAggs[bucket.key] || false"
                       class="form-checkbox"
                       :id="bucket.key"
                       type="checkbox">
                <label class="form-option form-option-swatch" :for="bucket.key">
                    <span
                            class="form-option-variant form-option-variant--color"
                            :title="bucket.key"
                            :style="`background-color: #${colorPalette[bucket.key]}`">

                    </span>
                </label>
            </template>
        </div>
        <a onClick="incrementCardinality(field)" v-if="size < aggregations.cardinality">Show more...</a>
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
                mutable_sort: 'count',
                colorPalette: {
                    "Navy": '325AB5',
                    "Silver": 'CACED0',
                    "Gray": 'A1A1A1',
                    "Blue": '4276AB',
                    "Pink": 'A80F6B',
                    "Black": '000000',
                    "Gold": 'BDB23D',
                    "Rose Gold": 'F0C3AD',
                    "Tan": '945630',
                    "Denim": '6495ED',
                    "Beige": 'EDE6D3',
                    "Red": 'B52128',
                    "Yellow": 'E3E620',
                    "Fuchsia": 'FF00FF',
                    "Nude": 'ECCFCF',
                    "White": 'FFFFFF',
                    "Brown": '2F200C',
                    "Coral": 'FF94FF',
                    "Floral": '',
                    "Khaki": '778A6E',
                    "Mint": 'BBE1C9',
                    "Multi-Color": '',
                    "Purple": '7153B0',
                    "Taupe": 'BBAC99',
                    "Turquoise": '65B2BC',
                    "Lime": '89E16A',
                    "Multi-Colored": '',
                    "Orange": 'D47A04',
                    "Rose": 'DAB3EB',
                    "StoneGreen": '',
                    "green": '164525',
                    "Black Leather": '000000',
                    "Bronze": '7D6E23',
                    "Burgundy": '701033',
                    "Camel": '8B4513',
                    "Gold/White": 'CFB666',
                    "Gray/Blue": 'C1CAD9',
                    "Light Gray": '',
                    "Light Pink": 'D1AFB3',
                    "Light navy": '',
                    "Mauve": 'DC8F72',
                    "Metallic Blue": '9AC1C5',
                    "Navy Perf": '4953E3',
                    "Old Rose": 'CFAAC6',
                    "Peach": 'FFDAB9',
                    "Ruby": '853544',
                    "Tan/Navy": 'B89467',
                    "Teal": '3CA1B3',
                    "blue": '316ACC',
                    "navy": '325AB5',
                    " Blue": '316ACC'

                }
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
            incrementCardinality: async function (field) {
                await this.$store.dispatch('filter/incrementCardinalityByField', {
                    field: field,
                    cardinality: this.aggregations.cardinality
                })
            }
        }
    }
</script>