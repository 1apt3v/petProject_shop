import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Cart from '../Cart/Cart';
import styles from './shopping.module.css'
import cartIcon from './../../../assets/img/cart.png'
import Order from '../Order/Order';
import Menu from '../../Menu/Menu';
import Homepage from '../../Homepage/Homepage';
import { shopAPI } from '../../../api/api';
import Catalog from '../Catalog/Catalog';


const Shopping = ({ decrementItemInCart, incrementItemInCart, deleteCart, shoppingReducer, setGoods, setCart, addCart }) => {
    const [isMenuDisplay, setIsMenuDisplay] = useState(false)

    useEffect(() => {
        shopAPI.getGoods().then(data => setGoods(data))
        shopAPI.getCart().then(data => setCart(data))

    }, [setGoods, setCart])


    return (
        <div className={styles.shoppingList} >
            <div className={styles.navigationShop}>
                {/* <NavLink className={styles.navCatalog} to='/shop/catalog'>Каталог</NavLink> */}
                <div>
                    <span className={styles.navCatalog} onClick={() => setIsMenuDisplay(!isMenuDisplay)} >Каталог</span>
                    <input className={styles.inputFinder} type="text" placeholder="Поиск товара" />
                </div>
                <NavLink className={styles.buttonCart} to='/shop/cart'>
                    <img src={cartIcon} alt={cartIcon} />
                    <span>Корзина</span>
                </NavLink>
            </div>

            <div>
                {isMenuDisplay ? <Menu setIsMenuDisplay={setIsMenuDisplay} /> : null}
                <div>
                    <Route exact path='/shop' render={() => <Homepage setIsMenuDisplay={setIsMenuDisplay} />} />
                    <Route exact path='/shop/order' render={() => <Order />} />
                    <Route path='/shop/smartphone'
                        render={() => <Catalog
                            addCart={addCart}
                            goods={shoppingReducer.goods}
                            cart={shoppingReducer.cart}
                        />}
                    />
                    <Route exact path='/shop/cart'
                        render={() => <Cart
                            decrementItemInCart={decrementItemInCart}
                            incrementItemInCart={incrementItemInCart}
                            deleteCart={deleteCart}
                            cart={shoppingReducer.cart}
                        />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Shopping;