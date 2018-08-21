import builder from 'elastic-builder'
import qs from 'qs'
import config from '@/config'
import router from '@/router'
import store from '../store'

export default class QueryFactory {
    initialQuery() {
        const body = builder.requestBodySearch()
        const queries = router.app.$route.query
        store.getters['filter/getFilters'].forEach(filter => {

            const filters = this.queryMaker(filter, queries)

            body.aggregation(builder.filterAggregation(filter.field, filters).aggs([
                this.aggregationMaker(filter),
                builder.cardinalityAggregation(filter.field + '_count', filter.field)
            ]))
        })

        body.size(config.size)
        body.sort(this.setSort(queries))
        body.from(this.setPage(queries))
        body.postFilter(this.bodyPostFilter(queries))
        console.log(body.toJSON())
        return body.toJSON()
    }

    setSort(queries) {
        if (queries['sort']) {
            let sortQuery = queries['sort']
            if (typeof sortQuery !== 'string')
                sortQuery = sortQuery[0]

            const sort = sortQuery.split('_')
            return builder.sort(sort[0] === 'Title' ? sort[0] + '.raw' : sort[0], sort[1])
        }
        return builder.sort(config.sort.field, config.sort.order)
    }

    setPage(queries) {
        if (queries['page']) {
            let pageQuery = queries['page'] - 1

            console.log(pageQuery, config.size, pageQuery * config.size)
            return pageQuery * config.size
        }
        return 0
    }

    aggregationMaker(filter) {
        switch (filter.type) {
            case 'Refinement': {
                return QueryFactory.termAggregation(filter)
            }
            case 'Numeric' : {
                return QueryFactory.rangeAggregation(filter)
            }
        }
    }

    static termAggregation(filter) {
        const size = store.getters['filter/getCardinalityByField'](filter.field) || filter.size
        return builder.termsAggregation(filter.field, filter.field).size(size)
    }

    static rangeAggregation(filter) {
        return builder.rangeAggregation(filter.field, filter.field).ranges(filter.keys)
    }

    createCategoryOrSearchFilter() {
        const searchContainer = document.getElementById('search-results-content')
        if (!!!searchContainer) {
            return builder.boolQuery().must(builder.termQuery('Categories', window.categoryId))
        }

        const query = qs.parse(window.location.search)
        return builder.boolQuery().must(builder.multiMatchQuery(['Title', 'SKU'],query['?search_query']))
    }

    bodyPostFilter(queries) {
        const filters = this.createCategoryOrSearchFilter()
        for (let key in queries) {
            const filterFromQuery = config.filters.find(f => {
                return f.field === key
            })

            if (!filterFromQuery) {
                continue
            }

            if (typeof queries[key] === 'string')
                queries[key] = [queries[key]]

            if (queries[key].length > 1) {
                queries[key].forEach(agg => {
                    filters.should(QueryFactory[filterFromQuery.type](key, agg))
                })
            } else {
                queries[key].forEach(agg => {
                    filters.must(QueryFactory[filterFromQuery.type](key, agg))
                })
            }
        }
        return filters
    }

    queryMaker(filter, queries) {
        const filters = this.createCategoryOrSearchFilter()
        for (let key in queries) {
            const filterFromQuery = config.filters.find(f => {
                return f.field === key
            })

            if (!filterFromQuery) {
                continue
            }

            if (key === filter.field) {
                continue
            }

            if (typeof queries[key] === 'string')
                queries[key] = [queries[key]]

            if (queries[key].length > 1) {
                queries[key].forEach(agg => {
                    filters.should(QueryFactory[filterFromQuery.type](key, agg))
                })
            } else {
                queries[key].forEach(agg => {
                    filters.must(QueryFactory[filterFromQuery.type](key, agg))
                })
            }
        }

        return filters
    }

    static Numeric(field, query) {
        const toFrom = query.split('_')
        const filter = builder.rangeQuery(field)

        if (parseInt(toFrom[1])) {
            filter.gte(toFrom[0]).lt(toFrom[1])
        } else {
            filter.gte(toFrom[0])
        }

        return filter
    }

    static Refinement(field, query) {
        return builder.termQuery(field, query)
    }
}
