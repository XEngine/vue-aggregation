<template>
    <main class="page-content">
        <sort/>
        <div class="list-grid--switcher">
            <a class="list" v-on:click="toggleGrid" :class="{'active' : gridClass === 'productGrid'}">
                <i class="fa fa-list-ul" aria-hidden="true"></i>
            </a>
            <a class="grid" v-on:click="toggleGrid" :class="{'active' : gridClass === 'productList'}">
                <i class="fa fa-th" aria-hidden="true"></i>
            </a>
        </div>
        <ul :class="gridClass">
            <li v-for="hit in hits.hits" class="product">
                <article class="card">
                    <figure class="card-figure">
                        <a :href="`${hit._source.StoreURL}`">
                            <div class="card-img-container">
                                <img class="card-image lazyautosizes" data-sizes="auto"
                                     :src="hit._source.ImgFile"
                                     :data-src="hit._source.ImgFile"
                                     :alt="hit._source.Title" :title="hit._source.Title" sizes="288px">
                            </div>
                        </a>
                        <figcaption class="card-figcaption">
                            <div class="card-figcaption-body">
                                <a :href="`${hit._source.StoreURL}`"
                                   class="card-figcaption-button quickview"
                                   :data-product-id="hit._source.StoreProductID"><img
                                        src="/stencil/00000000-0000-0000-0000-000000000001//img/mag.svg" alt=""></a>
                            </div>
                        </figcaption>
                    </figure>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a :href="`${hit._source.StoreURL}`">{{hit._source.Title}}</a>
                        </h4>
                        <div class="card-desc">
                            {{hit._source.Description}}
                        </div>
                        <div class="card-text" data-test-info-type="price">
                            <div class="price-section price-section--withoutTax ">
                                <span data-product-price-without-tax="" class="price price--withoutTax">{{moneyFormat(hit._source.Price)}}</span>
                                <span v-if="hit._source.RetailPrice > 0" data-product-rrp-without-tax=""
                                      class="price price--rrp">{{moneyFormat(hit._source.RetailPrice)}}</span>
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
        data() {
            return {
                gridClass: 'productGrid'
            }
        },
        methods: {
            moneyFormat(amount) {
                try {
                    const result = Dinero({amount: Math.ceil(amount * 100), currency: 'USD'}).toFormat('$0,0.00');
                    return result
                } catch (e) {
                    console.log(amount)
                }
            },
            toggleGrid() {
                this.gridClass = this.gridClass === 'productGrid' ? 'productList' : 'productGrid'
            }
        }
    }
</script>