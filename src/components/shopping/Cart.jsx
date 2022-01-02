import React from 'react'
import styles from './shopping.module.css'
import emptyCartPng from './../../assets/img/emptyCart.png'
import { NavLink } from 'react-router-dom'

const countingFinalPrice = (cart) => {
    if (cart === undefined) {
        return
    }
    return cart.reduce((prev, curr) => {
        return prev + curr.price * curr.amount
    }, 0);
}

const countingAmount = (cart) => {
    if (cart === undefined) {
        return
    }
    return cart.reduce((prev, curr) => {
        return prev + curr.amount
    }, 0);
}

function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}


const Cart = ({ cart, deleteCart, incrementItemInCart, decrementItemInCart }) => {
    const price = countingFinalPrice(cart)
    const amount = countingAmount(cart)
    const nameAmountWord = declOfNum(amount, ['товар', 'товара', 'товаров'])

    const cartElements = cart.map(item => (
        <div className={styles.cartItemWrapper} key={item.id}>
            <div className={styles.cartItem}>
                <img src={item.img} alt={`${item.name}`} />
                <div className={styles.cartItemTitle}>
                    <span>{`${item.name}`}</span>
                    <button className={styles.deleteItem} onClick={() => deleteCart(item.id)}>Удалить</button>
                </div>
            </div>
            <div className={styles.counterItemInCart}>
                <button onClick={() => decrementItemInCart(item.id, item.amount)}>-</button>
                <div className={styles.counterValue}>
                    {item.amount}
                </div>
                <button onClick={() => incrementItemInCart(item.id, item.amount)}>+</button>
            </div>
            <div className={styles.price}>{`${item.price * item.amount} ₽`}</div>
        </div>)
    )

    return (
        <div>
            <h1>Корзина</h1>
            <div className={styles.cart}>
                <div className={styles.cartItemsResult} >
                    {cart.length
                        ? cartElements
                        : <div className={styles.emptyCart}>
                            <img src={emptyCartPng} alt="emptyCart" />
                            <span>Корзина пустая</span>
                        </div>
                    }
                </div>
                <div className={styles.buyBlock}>
                    <div className={styles.finalPrice}>
                        <h3>Итого: {`${amount} ${nameAmountWord} на ${price} ₽`}</h3>
                    </div>
                    <NavLink className={styles.buyButton} to="/shop/order">Купить</NavLink>
                    {/* <div className={styles.buyButton}>
                        <button>Купить</button>
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default Cart