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



const Shopping = ({
    goods,
    decrementItemInCart,
    incrementItemInCart,
    deleteCart,
    shoppingReducer,
    setGoods,
    setCart,
    addCart,
    setNewPage,
    cart,
    setDefaultValueArrayGoods,
    setTotalCountGoods,
    totalCountGoods }) => {
    const [isMenuDisplay, setIsMenuDisplay] = useState(false)


    const [fetchingCart, setFetchingCart] = useState(true)
    const [totalCountElementsCart, setTotalCountElementCart] = useState(1)


    useEffect(() => {
        if (cart.length < totalCountElementsCart) {
            shopAPI.getCart()
                .then((data, totalCount) => {
                    if (!data.length) {
                        setFetchingCart(false)
                        return
                    }
                    setTotalCountElementCart(totalCount)
                    data.map(item => shopAPI.getGoodsToCart(item.id)
                        .then(goods => setCart(...goods.data, item.amount, item.timeAdd))
                        .finally(() => setFetchingCart(false))
                    )
                })
        }
    }, [fetchingCart])




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
                    <Route path='/shop/catalog/:category'
                        render={() => <Catalog
                            currentPage={shoppingReducer.currentPage}
                            addCart={addCart}
                            goods={goods}
                            totalCountGoods={totalCountGoods}
                            cart={shoppingReducer.cart}
                            setNewPage={setNewPage}
                            setGoods={setGoods}
                            setDefaultValueArrayGoods={setDefaultValueArrayGoods}
                            setTotalCountGoods={setTotalCountGoods}
                        />}
                    />
                    <Route exact path='/shop/cart'
                        render={() => <Cart
                            decrementItemInCart={decrementItemInCart}
                            incrementItemInCart={incrementItemInCart}
                            deleteCart={deleteCart}
                            cart={cart}
                            setCart={setCart}
                            fetchingCart={fetchingCart}
                        />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Shopping;