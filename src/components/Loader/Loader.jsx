import React from 'react'
import loader from './../../assets/img/loader.png'
import styles from './loader.module.css'

const LoaderComponent = () => (
    <div className={styles.loader}>
        <img src={loader} alt="Loading" />
    </div>
)

export default LoaderComponent