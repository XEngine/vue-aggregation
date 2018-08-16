import axios from 'axios'
import config from '@/config'

export default axios.create({
    baseURL: config.apiUri,
    timeout: 100000,
})