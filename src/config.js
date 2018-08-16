const config = {}
//config.apiUri = 'https://api.optimum7.com/yosemitesam/littlefeets/backend/bridge.php'
config.apiUri = '//api72.optimum7.com/yosemitesam/littlefeets/backend/bridge.php'
config.indexName = 'littlefeets'
config.sort = {field: 'Title.raw', order: 'ASC'}
config.size = 21
config.filters = [
    {
        name: 'Price',
        field: 'Price',
        size: 100,
        operator: 'AND',
        type: 'Numeric',
        component: 'Numeric',
        keys: [
            {key: "up to 50$", from: 0, to: 50},
            {key: "50$ to 100$", from: 50, to: 100},
            {key: "100$ or more", from: 100}
        ]
    },
    {
        name: 'Brands',
        field: 'ProductFilters.Brands',
        size: 10,
        operator: 'AND',
        type: 'Refinement',
        component: 'Refinement'
    },
    {
        name: 'Color',
        field: 'ProductFilters.Color',
        size: 100,
        operator: 'AND',
        type: 'Refinement',
        component: 'Swatch'
    },
    {
        name: 'Size',
        field: 'ProductFilters.Size',
        size: 10,
        operator: 'AND',
        type: 'Refinement',
        component: 'Refinement'
    }
]

export default config