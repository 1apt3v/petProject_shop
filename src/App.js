import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import Shopping from './components/shopping/Shopping/Shopping';
import { addCart, decrementItemInCart, deleteCart, incrementItemInCart, setGoods, setCart } from './redux/shoppingReducer';
import { NavLink, Route } from 'react-router-dom';
import Test from './components/Test/Test';



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
                    setGoods={props.setGoods}
                    setCart={props.setCart}
                />
            </Route>
            <Route path="/test">
                <Test testReducer={props.testReducer} shoppingReducer={props.shoppingReducer} />
            </Route>

            <Route exact path='/' render={() => (
                <div>
                    <NavLink to='/shop'>Магазин</NavLink>
                    <NavLink to='/test'>Тестирование</NavLink>
                </div>
            )} />


        </div>


    )

}

const mapStateToProps = (state) => {
    return {
        shoppingReducer: state.shoppingReducer,
        testReducer: state.testReducer
    }
}

const mapDispatchToProps = {
    addCart, deleteCart, incrementItemInCart, decrementItemInCart, setGoods, setCart
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
