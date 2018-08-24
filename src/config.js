const config = {}
//config.apiUri = 'https://api.optimum7.com/yosemitesam/littlefeets/backend/bridge.php'
config.apiUri = '//api72.optimum7.com/yosemitesam/peora-cem/backend/bridge.php'
config.indexName = 'peora'
config.sort = {field: 'Featured', order: 'DESC'}
config.size = 48
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
        name: 'Metal',
        field: 'ProductFilters.Metal',
        size: 10,
        operator: 'AND',
        type: 'Refinement',
        component: 'Refinement'
    },
    {
        name: 'Type',
        field: 'ProductFilters.Type',
        size: 100,
        operator: 'AND',
        type: 'Refinement',
        component: 'Refinement'
    },
    {
        name: 'Gemstone',
        field: 'ProductFilters.Gemstone',
        size: 10,
        operator: 'AND',
        type: 'Refinement',
        component: 'Refinement'
    },
    {
        name: 'Shape',
        field: 'ProductFilters.Shape',
        size: 10,
        operator: 'AND',
        type: 'Refinement',
        component: 'Refinement'
    },
    {
        name: 'Finger Size',
        field: 'ProductFilters.Finger Size',
        size: 10,
        operator: 'AND',
        type: 'Refinement',
        component: 'Refinement'
    }
]

export default config