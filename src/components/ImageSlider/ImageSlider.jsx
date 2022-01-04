import React from 'react';
import { useState } from 'react';
import LoaderComponent from '../Loader/Loader';
import styles from './imageSlider.module.css'

const ImageSlider = ({ array }) => {
    const [current, setCurrent] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const length = array.length

    const nextSlide = () => {
        if (length > 1) {
            setIsLoaded(false)
            setCurrent(current === length - 1 ? 0 : current + 1)
        }
    }

    // console.log(length)

    const prevSlide = () => {
        if (length > 1) {
            setIsLoaded(false)
            setCurrent(current === 0 ? length - 1 : current - 1)
        }
    }

    return (
        <div className={styles.slider}>
            <span className={`${styles.buttonSlide} ${styles.leftButton}`} onClick={prevSlide}>{'<'}</span>

            <div>
                {array.map((item, index) => <div key={index}>
                    {index === current && (<img
                        className={isLoaded ? `${styles.imgSlide} ${styles.imgSlideLoaded}` : styles.imgSlide}
                        src={item}
                        onLoad={() => setIsLoaded(true)}
                        alt={'img' + index}
                    />
                    )}
                </div>)}
            </div>

            <span className={`${styles.buttonSlide} ${styles.rightButton}`} onClick={nextSlide} >{'>'}</span>
        </div>
    );
};

export default ImageSlider;