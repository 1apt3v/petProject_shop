import { shopAPI } from "../api/api"

const BUY_GOODS = 'BUY_GOODS'
const DELETE_GOODS = 'DELETE_GOODS'
const INCREMENT_ITEM_IN_CART = 'INCREMENT_ITEM_IN_CART'
const DECREMENT_ITEM_IN_CART = 'DECREMENT_ITEM_IN_CART'
const SET_GOODS = 'GET_GOODS'
const SET_CART = 'GET_CART'



// const localCart = JSON.parse(localStorage.getItem('cart'))

const initialState = {
    // menu: [],
    goods: [],
    // cart: localCart ? localCart : []
    cart: []
}



const shoppingReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_GOODS: {
            if (state.cart.find(goods => goods.id === action.payload)) {
                let newState = { ...state }
                newState.cart.find(goods => goods.id === action.payload).amount += 1
                return {
                    ...state,
                    cart: newState.cart
                }
            }
            const item = { ...state.goods[action.payload - 1], amount: 1 }
            return {
                ...state,
                cart: [...state.cart, item]
            }
        }
        case DELETE_GOODS: {
            const newCart = state.cart.filter(element => element.id !== action.payload)
            return {
                ...state,
                cart: newCart
            }
        }
        case INCREMENT_ITEM_IN_CART: {
            let newState = { ...state }
            newState.cart.find(goods => goods.id === action.payload).amount += 1
            return {
                ...state,
                cart: newState.cart

            }
        }
        case DECREMENT_ITEM_IN_CART: {
            let newState = { ...state }
            const findingInCart = newState.cart.find(goods => goods.id === action.payload)

            if (findingInCart.amount > 1) {
                findingInCart.amount -= 1
                return {
                    ...state,
                    cart: newState.cart
                }
            } else {
                const newCart = newState.cart.filter(element => element.id !== action.payload)
                return {
                    ...state,
                    cart: newCart
                }
            }
        }
        case SET_GOODS: {
            const arr = [...action.payload].sort((a, b) => a.id > b.id ? 1 : -1)
            return {
                ...state,
                goods: [...arr]
            }
        }
        case SET_CART: {
            const arr = action.payload
            const goods = state.goods

            const cart = arr
                .map(item => {
                    let findedGoods = goods.find(good => good.id === item.id)
                    findedGoods.amount = item.amount
                    return findedGoods
                })
                .sort((a, b) => a.id > b.id ? 1 : -1)
            return {
                ...state,
                cart: [...cart]
            }
        }
        default:
            return state
    }
}

const addCartAC = (id) => ({ type: BUY_GOODS, payload: id })
const deleteCartAC = (id) => ({ type: DELETE_GOODS, payload: id })
const incrementItemInCartAC = (id) => ({ type: INCREMENT_ITEM_IN_CART, payload: id })
const decrementItemInCartAC = (id) => ({ type: DECREMENT_ITEM_IN_CART, payload: id })
const setGoodsAC = (data) => ({ type: SET_GOODS, payload: data })
const setCartAC = (data) => ({ type: SET_CART, payload: data })

export const addCart = (id) => {
    return async (dispatch) => {
        try {
            let response = await shopAPI.postCart(id)
            console.log(response)
            if (response.status >= 200 && response.status < 300) {
                dispatch(addCartAC(id))
            }
        } catch (e) {
            console.error('Error: ', e)
        }
    }
}

export const deleteCart = (id) => {
    return async (dispatch) => {
        try {
            await shopAPI.deleteItem(id)
            dispatch(deleteCartAC(id))
        } catch (e) {
            console.error('Error:', e)
        }
    }
}

export const incrementItemInCart = (id, amount) => {
    return async (dispatch) => {
        try {
            let response = await shopAPI.putIncrementAmount(id, amount + 1)
            if (response.status >= 200 && response.status < 300) {
                dispatch(incrementItemInCartAC(id))
            }
        } catch (e) {
            console.error('Error: ', e)
        }
    }
}

export const decrementItemInCart = (id, amount) => {
    return async (dispatch) => {
        try {
            if (amount <= 1) {
                await shopAPI.deleteItem(id)
                dispatch(decrementItemInCartAC(id))
            } else {
                await shopAPI.putDecrementAmount(id, amount - 1)
                dispatch(decrementItemInCartAC(id))
            }
        } catch (e) {
            console.error('Error: ', e)
        }
    }
}

export const setGoods = (data) => {
    return (dispatch) => {
        dispatch(setGoodsAC(data))
    }
}

export const setCart = (data) => {
    return (dispatch) => {
        dispatch(setCartAC(data))
    }
}

export default shoppingReducer

