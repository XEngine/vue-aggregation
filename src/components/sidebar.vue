<template>
    <div class="filters">
        <div class="container">
            <ul class="filter">
                <template v-for="filter in filters">
                    <component
                            v-bind:is="filter.component"
                            :field="filter.field"
                            :operator="filter.operator"
                            :size="filter.size"
                            :name="filter.name"
                            :keys="filter.keys || null"
                    >
                    </component>
                </template>
            </ul>
            <clear-selected />

            <div class="filter-display">
                <div class="list-grid--switcher">
                    <a class="grid" v-on:click="toggleGrid" :class="{'active' : gridClass === 'productList'}">
                        <i class="fa fa-th" aria-hidden="true"></i>
                    </a>
                    <a class="list" v-on:click="toggleGrid" :class="{'active' : gridClass === 'productGrid'}">
                        <i class="fa fa-list-ul" aria-hidden="true"></i>
                    </a>
                </div>
                <sort/>
            </div>
        </div>
    </div>
</template>
<script>
    import RefinementFilter from "../filter-types/refinement-filter";
    import SwatchFilter from "../filter-types/swatch-filter";
    import NumericFilter from "../filter-types/numeric-filter";
    import {mapGetters} from 'vuex'
    import ClearSelected from "./clearSelected";
    import Sort from './sort'

    export default {
        components: {
            ClearSelected,
            Sort,
            'Refinement': RefinementFilter,
            'Numeric': NumericFilter,
            'Swatch': SwatchFilter
        },
        computed: {
            ...mapGetters({
                filters: 'filter/getFilters'
            })
        },
        data() {
            return {
                gridClass: 'productGrid'
            }
        },
        methods: {
            toggleGrid() {
                this.gridClass = this.gridClass === 'productGrid' ? 'productList' : 'productList'
            }
        }
    }
</script>
