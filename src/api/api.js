import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/',
})


export const shopAPI = {
    getGoods() {
        return instance.get(`goods`)
            .then(response => response.data)
    },
    getCart() {
        return instance.get(`cart`)
            .then(response => response.data)
    },
    postCart(id) {
        return instance.post(`cart`, { id, amount: 1 })
    },
    putIncrementAmount(id, amount) {
        console.log(amount)
        return instance.put(`cart/${id}`, {amount})
    },
    putDecrementAmount(id, amount) {
        console.log(amount)
        return instance.put(`cart/${id}`, {amount})
    },
    deleteItem(id) {
        return instance.delete(`cart/${id}`)
            .then(response => response.data)
    }
}