import { shopAPI } from "../api/api"

const ADD_CART = 'ADD_CART'
const DELETE_GOODS = 'DELETE_GOODS'
const INCREMENT_ITEM_IN_CART = 'INCREMENT_ITEM_IN_CART'
const DECREMENT_ITEM_IN_CART = 'DECREMENT_ITEM_IN_CART'
const SET_GOODS = 'GET_GOODS'
const SET_CART = 'GET_CART'
const SET_NEW_PAGE = 'SET_NEW_PAGE'
const SET_DEFAULT_VALUE_ARRAY_GOODS = 'SET_DEFAULT_VALUE_ARRAY_GOODS'
const SET_TOTAL_COUNT_GOODS = 'SET_TOTAL_COUNT_GOODS'



// const localCart = JSON.parse(localStorage.getItem('cart'))

const initialState = {
    // menu: [],
    goods: [],
    // cart: localCart ? localCart : []
    cart: [],
    currentPage: 0,
    totalCountGoods: 0,
}



const shoppingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART: {
            const item = { ...state.goods.find(goods => goods.id === action.payload.id), amount: 1, timeAdd: action.payload.timeAdd }
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
                goods: [...state.goods, ...arr]
            }
        }
        case SET_CART: {
            const elemCart = {
                ...action.payload.data,
                amount: action.payload.amount
            }
            const arr = [...state.cart, elemCart].sort((a, b) => a.timeAdd > b.timeAdd ? 1 : -1)
            return {
                ...state,
                cart: arr
            }
        }
        case SET_NEW_PAGE: {
            return {
                ...state,
                currentPage: state.currentPage + 1
            }
        }
        case SET_DEFAULT_VALUE_ARRAY_GOODS: {
            return {
                ...state,
                goods: [],
                currentPage: 1
            }
        }
        case SET_TOTAL_COUNT_GOODS: {
            return {
                ...state,
                totalCountGoods: action.payload
            }
        }


        default:
            return state
    }
}

const addCartAC = (id, timeAdd) => ({ type: ADD_CART, payload: { id, timeAdd } })
const deleteCartAC = (id) => ({ type: DELETE_GOODS, payload: id })
const incrementItemInCartAC = (id) => ({ type: INCREMENT_ITEM_IN_CART, payload: id })
const decrementItemInCartAC = (id) => ({ type: DECREMENT_ITEM_IN_CART, payload: id })
const setGoodsAC = (data) => ({ type: SET_GOODS, payload: data })
const setCartAC = (data, amount, timeAdd) => ({ type: SET_CART, payload: { data, amount, timeAdd } })
const setNewPageAC = () => ({ type: SET_NEW_PAGE })
const setDefaultValueArrayGoodsAC = () => ({ type: SET_DEFAULT_VALUE_ARRAY_GOODS })
const setTotalCountGoodsAC = (count) => ({ type: SET_TOTAL_COUNT_GOODS, payload: count })

export const addCart = (id) => {
    return async (dispatch) => {
        try {
            const timeAdd = Date.now()
            let response = await shopAPI.postCart(id, timeAdd)
            console.log(response)
            if (response.status >= 200 && response.status < 300) {
                dispatch(addCartAC(id, timeAdd))
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

export const setCart = (data, amount, timeAdd) => {
    return (dispatch) => {
        dispatch(setCartAC(data, amount, timeAdd))
    }
}

export const setNewPage = () => {
    return (dispatch) => {
        dispatch(setNewPageAC())
    }
}

export const setDefaultValueArrayGoods = () => {
    return (dispatch) => {
        dispatch(setDefaultValueArrayGoodsAC())
    }
}

export const setTotalCountGoods = (count) => {
    return (dispatch) => {
        dispatch(setTotalCountGoodsAC(count))
    }
}

export default shoppingReducer

