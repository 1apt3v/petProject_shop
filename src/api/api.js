import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/',
})


export const shopAPI = {
    getGoods(currentPage = 1, category) {
        return instance.get(`goods?_limit=5&_page=${currentPage}&category=${category}`)
            .then(response => ({ data: response.data, totalCount: response.headers['x-total-count'] }))
    },
    getGoodsToCart(id) {
        return instance.get(`goods?id=${id}`)
    },
    getCart() {
        return instance.get(`cart`)
            .then(response => response.data)
    },
    postCart(id, timeAdd) {
        return instance.post(`cart`, { id, amount: 1, timeAdd })
    },
    putIncrementAmount(id, amount) {
        console.log(amount)
        return instance.put(`cart/${id}`, { amount })
    },
    putDecrementAmount(id, amount) {
        console.log(amount)
        return instance.put(`cart/${id}`, { amount })
    },
    deleteItem(id) {
        return instance.delete(`cart/${id}`)
            .then(response => response.data)
    }
}