import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import shoppingReducer from "./shoppingReducer";
import testReducer from "./testReducer";


let reducers = combineReducers({
    shoppingReducer,
    testReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store