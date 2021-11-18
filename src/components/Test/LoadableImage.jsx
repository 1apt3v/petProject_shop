import React, { useState } from 'react';
import style from './test.module.css'

const LoadableImage = ({ src, alt, onLoad }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <div className={isLoaded ? `${style.container} ${style.containerLoaded}` : style.container}>
            <img onLoad={() => setIsLoaded(true)} className={isLoaded ? `${style.image} ${style.imageLoaded}` : style.image} src={src} alt={alt} />
        </div>
    );
};

export default LoadableImage;