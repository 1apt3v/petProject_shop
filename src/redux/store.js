import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import shoppingReducer from "./shoppingReducer";

let reducers = combineReducers({
    shoppingReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store