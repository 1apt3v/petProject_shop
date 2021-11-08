import React, { useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Cart from './Cart';
import styles from './shopping.module.css'
import cartIcon from './../../assets/img/cart.png'
import ModalWindow from '../reusableComponents/ModalWindow';
import Order from './Order';

const GoodsItem = ({ id, name, price, img, addCart, setModalWindowActive, setModalWindowData, setModalImgWindowActive }) => {
    return (
        <div className={styles.goodsItem} >
            <div className={styles.goodsTitle}>
                <img className={styles.imgGoods} src={img} alt={name} onClick={() => {
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
            <button className={styles.onCartButton} onClick={() => addCart(id)}>Купить</button>
        </div>
    )
}

export const Catalog = ({ goods, addCart }) => {
    const [modalImgWindowActive, setModalImgWindowActive] = useState(false)
    const [modalWindowActive, setModalWindowActive] = useState(false)
    const [modalWindowData, setModalWindowData] = useState()

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
        />)

    return (
        <div>
            <h1>Каталог</h1>
            {goodsElements}
            <ModalWindow active={modalImgWindowActive} setActive={setModalImgWindowActive}>
                <img src={modalWindowData?.img} alt="Iphone" />
            </ModalWindow>
            <ModalWindow active={modalWindowActive} setActive={setModalWindowActive}>
                <div>
                    <img src={modalWindowData?.img} alt="Iphone" />
                    <div>
                        {modalWindowData?.name}
                    </div>
                    <div>
                        {modalWindowData?.price}
                    </div>
                </div>
            </ModalWindow>
        </div>
    )
}

const Shopping = (props) => {
    return (
        <div className={styles.shoppingList} >
            <div className={styles.navigationShop}>
                <NavLink className={styles.navCatalog} to='/shop/catalog'>Каталог</NavLink>
                <NavLink className={styles.buttonCart} to='/shop/cart'>
                    <img src={cartIcon} />
                    <span>Корзина</span>
                </NavLink>
            </div>

            <div>
                <Route exact path='/shop/order' render={() => <Order />} />
                <Route path='/shop/catalog'
                    render={() => <Catalog
                        addCart={props.addCart}
                        goods={props.shoppingReducer.goods}
                    />}
                />
                <Route exact path='/shop/cart'
                    render={() => <Cart
                        decrementItemInCart={props.decrementItemInCart}
                        incrementItemInCart={props.incrementItemInCart}
                        deleteCart={props.deleteCart}
                        cart={props.shoppingReducer.cart}
                    />}
                />

            </div>
        </div>
    );
};

export default Shopping;