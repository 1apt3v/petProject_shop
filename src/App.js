import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import Shopping from './components/shopping/Shopping/Shopping';
import {
    addCart,
    decrementItemInCart,
    deleteCart,
    incrementItemInCart,
    setGoods,
    setCart,
    setNewPage,
    setDefaultValueArrayGoods,
    setTotalCountGoods
} from './redux/shoppingReducer';
import { NavLink, Route } from 'react-router-dom';
import Test from './components/Test/Test';



const App = (props) => {

    return (
        <div>
            {/* <Redirect from='/' to='/shop' /> */}

            <Route path="/shop">
                <Shopping
                    goods={props.shoppingReducer.goods}
                    decrementItemInCart={props.decrementItemInCart}
                    incrementItemInCart={props.incrementItemInCart}
                    deleteCart={props.deleteCart}
                    addCart={props.addCart}
                    shoppingReducer={props.shoppingReducer}
                    setGoods={props.setGoods}
                    setCart={props.setCart}
                    setNewPage={props.setNewPage}
                    cart={props.shoppingReducer.cart}
                    setDefaultValueArrayGoods={props.setDefaultValueArrayGoods}
                    setTotalCountGoods={props.setTotalCountGoods}
                    totalCountGoods={props.shoppingReducer.totalCountGoods}
                />
            </Route>
            <Route path="/test">
                <Test
                    shoppingReducer={props.shoppingReducer}
                    setGoods={props.setGoods}
                    setNewPage={props.setNewPage}
                    setDefaultValueArrayGoods={props.setDefaultValueArrayGoods}
                    setNewPage={props.setNewPage}
                />
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
    addCart, deleteCart, incrementItemInCart,
    decrementItemInCart, setGoods, setCart,
    setNewPage, setDefaultValueArrayGoods,
    setTotalCountGoods
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
