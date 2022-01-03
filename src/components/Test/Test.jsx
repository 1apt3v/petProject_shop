import React, { useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import ImageSlider from '../ImageSlider/ImageSlider';
import style from './test.module.css'



const Test = ({testReducer, shoppingReducer}) => {

    const imgArray = [
        "https://c.dns-shop.ru/thumb/st4/fit/0/0/b64c4ce4b624ccdeccd0ace8f53c8546/135bf80ed325e9fdda1ea5dd5fccfa04343bbc328659e2c32608e6e17bcc8569.jpg",
        "https://the-istore.ru/upload/iblock/b6d/b6dc20e32c2b81727cb3b8d499190105.jpg",
        "https://apple11.ru/21469/iphone-se-128gb-silver.jpg",
        "https://the-istore.ru/upload/iblock/808/808fa8f9052cb4dd943572ea271e9dbb.jpg"
      ]
    
    return (
        <div className={style.test}>        
        </div>
    );
};

export default Test;