import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './goodsItem.module.css'

const GoodsItem = ({ id, name, price, img, imgArray, spectifications, addCart, setModalWindowActive, setModalWindowData, setModalImgWindowActive, cart }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [goodInCart, setGoodInCart] = useState(false)

    let history = useHistory()

    useEffect(() => {
        if (cart.find(item => item.id === id)) {
            setGoodInCart(true)
        }
    }, [id, cart])

    return (
        <div className={styles.goodsItem} >
            <div className={styles.goodsTitle}>
                <div className={styles.goodsPhoto}>
                    <img onLoad={() => setIsLoaded(true)}
                        className={isLoaded ? `${styles.imgGoodsSmall} ${styles.imgGoodsLoaded}` : styles.imgGoods}
                        src={img}
                        alt={name}
                        onClick={() => {
                            setModalWindowData({ name, imgArray })
                            setModalImgWindowActive(true)
                        }} />
                </div>

                <div className={styles.nameGoods}>
                    <span onClick={() => {
                        setModalWindowData({ id, name, price, img, spectifications })
                        setModalWindowActive(true)
                    }}>
                        {`${name}`}
                    </span>
                </div>

            </div>
            <div className={styles.goodsBuyWrapper}>
                <div className={styles.price}>
                    {`${price} ₽`}
                </div>
                <button
                    className={goodInCart ? styles.goCartBuyButton : styles.buyButton}
                    onClick={() => {
                        if (goodInCart) {
                            history.push("/shop/cart")
                        } else {
                            addCart(id)
                        }

                    }}
                >
                    {goodInCart ? 'В корзине' : 'Купить'}
                </button>
            </div>

        </div>
    )
}

export default GoodsItem