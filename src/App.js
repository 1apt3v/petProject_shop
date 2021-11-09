import './App.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Shopping from './components/shopping/Shopping';
import { addCart, decrementItemInCart, deleteCart, incrementItemInCart, getGoods } from './redux/shoppingReducer';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'
import db from './firebase/indexFirebase'



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
                    shoppingReducer={props.shoppingReducer}
                    getGoods={props.getGoods}
                    db={db} />
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
    addCart, deleteCart, incrementItemInCart, decrementItemInCart, getGoods
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
