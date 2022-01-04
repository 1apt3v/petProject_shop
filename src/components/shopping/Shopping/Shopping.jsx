import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Cart from '../Cart/Cart';
import styles from './shopping.module.css'
import cartIcon from './../../../assets/img/cart.png'
import Order from '../Order/Order';
import Menu from '../../Menu/Menu';
import Homepage from '../../Homepage/Homepage';
import Catalog from '../Catalog/Catalog';
import { shopAPI } from '../../../api/api';



const Shopping = ({ decrementItemInCart, incrementItemInCart, deleteCart, shoppingReducer, setGoods, setCart, addCart, setNewPage }) => {
    const [isMenuDisplay, setIsMenuDisplay] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [totalCountElements, setTotalCountElement] = useState(1)
    const goods = shoppingReducer.goods
    const currentPage = shoppingReducer.currentPage

    useEffect(() => {
        if (fetching === true && goods.length < totalCountElements) {
            // без проверки (fetch === true) useEffect срабатывает один лишний раз
            // (goods.length < totalCountElements) нужен, чтобы не делать лишних запросов на сервер
            // и не не обновлять state
            shopAPI.getGoods(currentPage)
                .then(({ data, totalCount }) => {
                    setTotalCountElement(totalCount)
                    setGoods(data)
                    setNewPage()
                })
                .finally(() => setFetching(false))
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return function () {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            // console.log('scroll');
            setFetching(true)
        }
    }


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
                            goods={goods}
                            cart={shoppingReducer.cart}
                        />}
                    />
                    <Route exact path='/shop/cart'
                        render={() => <Cart
                            decrementItemInCart={decrementItemInCart}
                            incrementItemInCart={incrementItemInCart}
                            deleteCart={deleteCart}
                            cart={shoppingReducer.cart}
                            setCart={setCart}
                        />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Shopping;