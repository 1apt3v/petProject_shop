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



const GoodsItem = ({ id, name, price, img, addCart, setModalWindowActive, setModalWindowData, setModalImgWindowActive }) => {
    const [isLoaded, setIsLoaded] = useState(false)
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
            <button className={styles.onCartButton} onClick={() => addCart(id)}>Купить</button>
        </div>
    )
}

export const Catalog = ({ goods, addCart }) => {
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

const Shopping = (props) => {
    const [isMenuDisplay, setIsMenuDisplay] = useState(false)

    useEffect(() => {
        //Получаем данные из Firebase
        props.db.collection('shop')
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                props.getGoods(data)
            })
            .catch(e => {
                console.error(e)
            })
    }, [])


    return (
        <div className={styles.shoppingList} >
            <div className={styles.navigationShop}>
                {/* <NavLink className={styles.navCatalog} to='/shop/catalog'>Каталог</NavLink> */}
                <div>
                    <span className={styles.navCatalog} onClick={() => setIsMenuDisplay(!isMenuDisplay)} >Каталог</span>
                    <input className={styles.inputFinder} type="text" placeholder="Поиск товара" />
                </div>
                <NavLink className={styles.buttonCart} to='/shop/cart'>
                    <img src={cartIcon} />
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
        </div>
    );
};

export default Shopping;