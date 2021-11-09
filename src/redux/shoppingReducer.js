const BUY_GOODS = 'BUY_GOODS'
const DELETE_GOODS = 'DELETE_GOODS'
const INCREMENT_ITEM_IN_CART = 'INCREMENT_ITEM_IN_CART'
const DECREMENT_ITEM_IN_CART = 'DECREMENT_ITEM_IN_CART'
const GET_GOODS = 'GET_GOODS'


const localCart = JSON.parse(localStorage.getItem('cart'))

const initialState = {
    goods: [],
    cart: localCart ? localCart : []
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
            if (newState.cart.find(goods => goods.id === action.payload).amount > 1) {
                newState.cart.find(goods => goods.id === action.payload).amount -= 1
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
        case GET_GOODS: {
            const arr = [...action.payload].sort((a, b) => a.id > b.id ? 1 : -1)
            return {
                ...state,
                goods: [...arr]
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
const getGoodsAC = (data) => ({ type: GET_GOODS, payload: data })

export const addCart = (id) => {
    return (dispatch) => {
        dispatch(addCartAC(id))
    }
}

export const deleteCart = (id) => {
    return (dispatch) => {
        dispatch(deleteCartAC(id))
    }
}

export const incrementItemInCart = (id) => {
    return (dispatch) => {
        dispatch(incrementItemInCartAC(id))
    }
}

export const decrementItemInCart = (id) => {
    return (dispatch) => {
        dispatch(decrementItemInCartAC(id))
    }
}

export const getGoods = (data) => {
    return (dispatch) => {
        dispatch(getGoodsAC(data))
    }
}

export default shoppingReducer

