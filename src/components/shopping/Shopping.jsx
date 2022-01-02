import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Cart from './Cart';
import styles from './shopping.module.css'
import cartIcon from './../../assets/img/cart.png'
import ModalWindow from '../reusableComponents/ModalWindow';
import Order from './Order';
import Loader from '../Loader/Loader';
import Menu from '../Menu/Menu';
import Homepage from '../Homepage/Homepage';
import { shopAPI } from '../../api/api';



const GoodsItem = ({ id, name, price, img, addCart, setModalWindowActive, setModalWindowData, setModalImgWindowActive, cart }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDisableButton, setIsDisableButton] = useState(false)

    useEffect(() => {
        if (cart.find(item => item.id === id)) {
            setIsDisableButton(true)
        }
    }, [id, cart])


    return (
        <div className={styles.goodsItem} >
            <div className={styles.goodsTitle}>
                <img onLoad={() => setIsLoaded(true)}
                    className={isLoaded ? `${styles.imgGoodsSmall} ${styles.imgGoodsLoaded}` : styles.imgGoods}
                    src={img}
                    alt={name}
                    onClick={() => {
                        setModalWindowData({ img })
                        setModalImgWindowActive(true)
                    }} />
                <div>
                    <span className={styles.nameGoods} onClick={() => {
                        setModalWindowData({ id, name, price, img })
                        setModalWindowActive(true)
                    }}>
                        {`${name} - ${price}`}
                    </span>
                </div>
            </div>
            <button disabled={isDisableButton}
                className={styles.onCartButton}
                onClick={() => addCart(id)}
            >
                {isDisableButton ? 'В корзине' : 'Купить'}
            </button>
        </div>
    )
}

export const Catalog = ({ goods, addCart, cart }) => {
    const [modalImgWindowActive, setModalImgWindowActive] = useState(false)
    const [modalWindowActive, setModalWindowActive] = useState(false)
    const [modalWindowData, setModalWindowData] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    const goodsElements = goods
        .map(item => <GoodsItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            img={item.img}
            addCart={addCart}
            setModalWindowActive={setModalWindowActive}
            setModalWindowData={setModalWindowData}
            setModalImgWindowActive={setModalImgWindowActive}
            cart={cart}
        />)

    return (
        <div>
            <h1>Каталог</h1>

            {
                goods.length
                    ? <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.filterMenu}>Filter</div>
                        <div>{goodsElements}</div>
                    </div>
                    : <Loader />
            }
            <ModalWindow active={modalImgWindowActive} setActive={setModalImgWindowActive} setModalWindowData={setModalWindowData} setIsLoaded={setIsLoaded}>
                {modalWindowData
                    ? <img src={modalWindowData.img}
                        alt="Iphone"
                        onLoad={() => setIsLoaded(true)}
                        className={isLoaded ? `${styles.imgGoods} ${styles.imgGoodsLoaded}` : styles.imgGoods} />
                    : <div>Loading...</div>
                }

            </ModalWindow>
            <ModalWindow active={modalWindowActive} setActive={setModalWindowActive} setModalWindowData={setModalWindowData} setIsLoaded={setIsLoaded}>
                <div>
                    <img src={modalWindowData.img}
                        alt="Iphone"
                        onLoad={() => setIsLoaded(true)}
                        className={isLoaded ? `${styles.imgGoods} ${styles.imgGoodsLoaded}` : styles.imgGoods} />
                    <div>
                        {modalWindowData.name}
                    </div>
                    <div>
                        {modalWindowData.price}
                    </div>
                </div>
            </ModalWindow>
        </div>
    )
}


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