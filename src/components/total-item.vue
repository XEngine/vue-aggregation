<template>
    <div class="itemTotal">
        {{hits.total}} ITEMS
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                hits: state => state.filter.hits
            })
        }
    }
</script>