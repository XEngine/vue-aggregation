<template>
    <div class="actionBar" method="get" data-sort-by="">
        <fieldset class="form-fieldset actionBar-section">
            <div class="form-field">
                <label class="form-label" for="sort">Sort By:</label>
                <select class="form-select form-select--small" v-model="sort" name="sort" id="sort">
                    <option value="featured">Featured Items</option>
                    <option value="newest">Newest Items</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="alphaasc">A to Z</option>
                    <option value="alphadesc">Z to A</option>
                    <option value="avgcustomerreview">By Review</option>
                    <option value="priceasc">Price: Ascending</option>
                    <option value="pricedesc">Price: Descending</option>
                </select>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sort: 'featured'
            }
        },
        watch: {
            sort: function () {
                this.changeSort()
            }
        },
        methods: {
            changeSort: function () {
                let query = {}
                switch(this.sort){
                    case 'alphaasc': {
                        query = {field: 'Title', order: 'ASC'}
                        break;
                    }
                    case 'alphadesc': {
                        query = {field: 'Title', order: 'DESC'}
                        break;
                    }
                    case 'featured': {
                        query = {field: 'Featured', order: 'DESC'}
                        break;
                    }
                    case 'newest': {
                        query = {field: 'Newest', order: 'DESC'}
                        break;
                    }
                    case 'bestselling': {
                        query = {field: 'BestSelling', order: 'DESC'}
                        break;
                    }
                    case 'avgcustomerreview': {
                        query = {field: 'CustomerReviews', order: 'DESC'}
                        break;
                    }
                    case 'priceasc': {
                        query = {field: 'Price', order: 'ASC'}
                        break;
                    }
                    case 'pricedesc': {
                        query = {field: 'Price', order: 'DESC'}
                        break;
                    }
                }
                this.$store.dispatch('filter/changeSort', query)
            }
        }
    }
</script>