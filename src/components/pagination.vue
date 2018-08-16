<template>
    <div class="pagination" v-if="pageCount > 1">
        <ul class="pagination-list">
            <li v-if="getCurrentPage > 1" class="pagination-item pagination-item--previous">
                <a class="pagination-link">
                    <i class="icon" aria-hidden="true">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-left"></use>
                        </svg>
                    </i>
                    Previous
                </a>
            </li>

            <li class="pagination-item" v-if="getCurrentPage > 6">
                <a v-on:click="changePage(1)" class="pagination-link">
                    <i class="icon" aria-hidden="true">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-left"></use>
                        </svg>
                    </i><i class="icon" aria-hidden="true">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-left"></use>
                    </svg>
                </i>
                </a>
            </li>
            <template v-for="n in pageCount">
                <!-- 5 8 11 -->
                <li class="pagination-item"
                    v-if="(n >= getCurrentPage - 5 && n <= getCurrentPage) || (n >= getCurrentPage && n <= getCurrentPage + 5)"
                    :class="{'pagination-item--current' : getCurrentPage === n}">
                    <a v-on:click="changePage(n)" class="pagination-link">{{n}}</a>
                </li>
            </template>

            <li class="pagination-item" v-if="getCurrentPage + 5 < pageCount">
                <a v-on:click="changePage(pageCount)" class="pagination-link">
                    <i class="icon" aria-hidden="true">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-right"></use>
                        </svg>
                    </i><i class="icon" aria-hidden="true">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-right"></use>
                    </svg>
                </i>
                </a>
            </li>

            <li v-if="getCurrentPage < pageCount" class="pagination-item pagination-item--next">
                <a class="pagination-link">
                    Next
                    <i class="icon" aria-hidden="true">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-right"></use>
                        </svg>
                    </i>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import config from '@/config'

    export default {
        computed: {
            ...mapGetters({
                hits: 'filter/getHits'
            }),
            pageCount: function () {
                if (!this.hits.total) {
                    return 0
                }
                return Math.ceil(this.hits.total / config.size)
            },
            getCurrentPage: function () {
                return this.$router.app.$route.query['page'] || 1
            }
        },
        watch: {
            page: function () {
                this.changePage()
            },
        },
        methods: {
            changePage: function (page) {
                this.$store.dispatch('filter/changePage', page)
            }
        }
    }
</script>