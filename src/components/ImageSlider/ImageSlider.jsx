import React from 'react';
import { useState } from 'react';
import styles from './imageSlider.module.css'

const ImageSlider = ({ array }) => {
    const [current, setCurrent] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const length = array.length

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    return (
        <div className={styles.slider}>
            <span className={`${styles.buttonSlide} ${styles.leftButton}`} onClick={() => {
                setIsLoaded(false)
                prevSlide()
            }}>{'<'}</span>

            <div>
                {array.map((item, index) => <div key={index}>
                    {index === current && (<img
                        className={isLoaded ? `${styles.imgSlide} ${styles.imgSlideLoaded}` : styles.imgSlide}
                        src={item}
                        onLoad={() => setIsLoaded(true)}
                        alt={'img' + index}
                    />)}
                </div>)}
            </div>

            <span className={`${styles.buttonSlide} ${styles.rightButton}`} onClick={() => {
                setIsLoaded(false)
                nextSlide()
            }} >{'>'}</span>
        </div>
    );
};

export default ImageSlider;