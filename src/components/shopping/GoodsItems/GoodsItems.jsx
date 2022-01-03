import React, { useEffect, useState } from 'react'
import styles from './goodsItems.module.css'

const GoodsItem = ({ id, name, price, img, imgArray, spectifications, addCart, setModalWindowActive, setModalWindowData, setModalImgWindowActive, cart }) => {
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
                <button disabled={isDisableButton}
                    className={styles.goCartButton}
                    onClick={() => addCart(id)}
                >
                    {isDisableButton ? 'В корзине' : 'Купить'}
                </button>
            </div>

        </div>
    )
}

export default GoodsItem