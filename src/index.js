import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


let rerender = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerender(store.getState())

store.subscribe(() => {
    let state = store.getState()
    localStorage.setItem('cart', JSON.stringify(state.shoppingReducer.cart))
    console.log("state updated")
    rerender(state)
})