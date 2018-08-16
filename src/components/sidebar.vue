<template>
    <aside class="page-sidebar">
        <nav>
            <clear-selected />
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
        </nav>
    </aside>
</template>
<script>
    import RefinementFilter from "../filter-types/refinement-filter";
    import SwatchFilter from "../filter-types/swatch-filter";
    import NumericFilter from "../filter-types/numeric-filter";
    import {mapGetters} from 'vuex'
    import ClearSelected from "./clearSelected";

    export default {
        components: {
            ClearSelected,
            'Refinement': RefinementFilter,
            'Numeric': NumericFilter,
            'Swatch': SwatchFilter
        },
        computed: {
            ...mapGetters({
                filters: 'filter/getFilters'
            })
        }
    }
</script>