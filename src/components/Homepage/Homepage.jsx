import React, { useEffect } from 'react';
import style from './homepage.module.css'

const Homepage = ({setIsMenuDisplay}) => {
    useEffect(() => {
        setIsMenuDisplay(true)
    }, [])
    
    return (
        <div className={style.homepage}>
            <h1>Добро пожаловать!</h1>
            <div>
                <p>Актуальные товары (позже)</p>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Homepage;