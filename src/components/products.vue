<template>
    <main class="page-content">
        <sort />
        <ul class="productGrid">
            <li v-for="hit in hits.hits" class="product">
                <article class="card ">
                    <figure class="card-figure">
                        <a :href="`https://littlefeetch.com${hit._source.StoreURL}`">
                            <div class="card-img-container">
                                <img class="card-image" data-sizes="auto"
                                     :src="hit._source.ImgFiles"
                                     :alt="hit._source.Title" :title="hit._source.Title" sizes="263px">
                            </div>
                        </a>
                        <figcaption v-if="hit._source.Price" class="card-figcaption">
                            <div class="card-figcaption-body">
                                <a :href="`https://littlefeetch.com${hit._source.StoreURL}`"
                                   class="button button--small card-figcaption-button"
                                   :data-product-id="hit._source.StoreProductID">Choose Options</a>
                            </div>
                        </figcaption>
                    </figure>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a :href="`https://littlefeetch.com${hit._source.StoreURL}`">{{hit._source.Title}}</a>
                        </h4>
                        <div class="card-text" v-if="hit._source.Price" data-test-info-type="price">
                            <div class="price-section price-section--withoutTax">
                                <span class="price-label"></span>
                                <span class="price-now-label" style="display: none;">Now:</span>
                                <span v-if="hit._source.PriceFrom > 0" class="price price--withoutTax">{{moneyFormat(hit._source.PriceFrom)}} - {{moneyFormat(hit._source.PriceTo)}}</span>
                                <span v-else class="price price--withoutTax">{{moneyFormat(hit._source.Price)}}</span>
                            </div>
                        </div>
                    </div>
                </article>
            </li>
        </ul>
        <pagination/>
    </main>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Dinero from 'dinero.js/build/esm/dinero'
    import Sort from './sort'
    import Pagination from './pagination'

    export default {
        components: {
            Sort,
            Pagination
        },
        computed: {
            ...mapGetters({
                hits: 'filter/getHits'
            })
        },
        methods: {
            moneyFormat(amount) {
                return Dinero({amount: amount*100, currency: 'USD'}).toFormat('$0,0.00')
            }
        }
    }
</script>