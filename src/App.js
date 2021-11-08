import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import Shopping from './components/shopping/Shopping';
import { addCart, decrementItemInCart, deleteCart, incrementItemInCart } from './redux/shoppingReducer';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'


const App = (props) => {
    return (
        <div>
            {/* <Redirect from='/' to='/shop' /> */}

            <Route path="/shop">
                <Shopping
                    decrementItemInCart={props.decrementItemInCart}
                    incrementItemInCart={props.incrementItemInCart}
                    deleteCart={props.deleteCart}
                    addCart={props.addCart}
                    shoppingReducer={props.shoppingReducer} />
            </Route>

            <Route path='/' render={() => (
                <div>
                    <NavLink to='/shop'>Магазин</NavLink>
                </div>
            )} />


        </div>


    )

}

const mapStateToProps = (state) => {
    return {
        shoppingReducer: state.shoppingReducer
    }
}

const mapDispatchToProps = {
    addCart, deleteCart, incrementItemInCart, decrementItemInCart
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
