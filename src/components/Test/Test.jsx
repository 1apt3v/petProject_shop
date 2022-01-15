import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Component from './Component';
import style from './test.module.css'



const Test = (props) => {

    return (
        <div className={style.test}>
            <ul>
                <li><NavLink to="/test/smartphones" >Comp1</NavLink></li>
                <li><NavLink to="/test/computers" >Comp2</NavLink></li>
            </ul>

            <Route path="/test/:category"
                render={() => <Component
                    goods={props.shoppingReducer.goods}
                    setGoods={props.setGoods}
                    setDefaultValueArrayGoods={props.setDefaultValueArrayGoods}
                    currentPage={props.shoppingReducer.currentPage}
                    setNewPage={props.setNewPage}
                />} />

        </div>
    );
};

export default Test;