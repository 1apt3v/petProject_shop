import React, { useState } from 'react'
import Loader from '../../Loader/Loader';
import styles from './catalog.module.css'
import ModalWindow from '../../reusableComponents/ModalWindows/ModalWindow';
import GoodsItem from '../GoodsItems/GoodsItems';
import ImageSlider from '../../ImageSlider/ImageSlider';
import LoaderComponent from '../../Loader/Loader';


const Catalog = ({ goods, addCart, cart }) => {
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
            imgArray={item.imgArray}
            spectifications={item.spectifications}
            addCart={addCart}
            setModalWindowActive={setModalWindowActive}
            setModalWindowData={setModalWindowData}
            setModalImgWindowActive={setModalImgWindowActive}
            cart={cart}
        />)

    const spectificationsFunc = () => {
        let array = Object.values(modalWindowData).map(item => {
            if (item.length === 2) {
                return item
            } else {
                spectificationsFunc(item)
            }
        })
        return array
    }


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

            {modalImgWindowActive
                ? <ModalWindow active={modalImgWindowActive}
                    setActive={setModalImgWindowActive}
                    setModalWindowData={setModalWindowData}
                    setIsLoaded={setIsLoaded}>
                    {modalWindowData
                        ? <div>
                            <div className={styles.titleNameImgModal}>{modalWindowData.name}</div>
                            <ImageSlider array={modalWindowData.imgArray} />
                        </div>
                        : <LoaderComponent />
                    }

                </ModalWindow>
                : null
            }
            {modalWindowActive
                ? <ModalWindow active={modalWindowActive}
                    setActive={setModalWindowActive}
                    setModalWindowData={setModalWindowData}
                    setIsLoaded={setIsLoaded}>
                    <div className={styles.aboutGoodsModal}>
                        <img src={modalWindowData.img}
                            alt="descriptionGoods"
                            onLoad={() => setIsLoaded(true)}
                            className={isLoaded ? `${styles.imgGoods} ${styles.imgGoodsLoaded}` : styles.imgGoods}
                        />

                        <div className={styles.spectificationGoodsModal}>
                            <div className={styles.specName}>
                                {modalWindowData.name}
                            </div>
                            <div>
                                {modalWindowData.price}
                            </div>
                            <div className={styles.spectification}>
                                {
                                    console.log(spectificationsFunc())

                                }
                            </div>
                        </div>

                    </div>
                </ModalWindow>
                : null
            }




        </div>
    )
}

export default Catalog