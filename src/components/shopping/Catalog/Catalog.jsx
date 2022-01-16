import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader';
import styles from './catalog.module.css'
import ModalWindow from '../../reusableComponents/ModalWindows/ModalWindow';
import GoodsItem from '../GoodsItems/GoodsItem';
import ImageSlider from '../../ImageSlider/ImageSlider';
import LoaderComponent from '../../Loader/Loader';
import SpecModal from './SpecModal';
import { withRouter } from 'react-router';
import { shopAPI } from '../../../api/api';

const Catalog = ({
    goods, addCart, cart,
    currentPage, setGoods,
    setNewPage, setDefaultValueArrayGoods,
    setTotalCountGoods, totalCountGoods,
    ...props
}) => {
    const [modalImgWindowActive, setModalImgWindowActive] = useState(false)
    const [modalWindowActive, setModalWindowActive] = useState(false)
    const [modalWindowData, setModalWindowData] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [fetchingGoods, setFetchingGoods] = useState(false)

    const [category, setCategory] = useState('')

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetchingGoods(true)
        } else {
            setFetchingGoods(false)
        }
    }

    useEffect(() => {

        if (category !== props.match.params.category) {
            setFetchingGoods(true)
            setTotalCountGoods(0)
            setDefaultValueArrayGoods()
            setCategory(props.match.params.category)
        }

        // console.log(fetchingGoods, goods.length, totalCountGoods);
        if (fetchingGoods === true && (goods.length < totalCountGoods || totalCountGoods === 0)) {
            // без проверки (fetch === true) useEffect срабатывает один лишний раз
            // (goods.length < totalCountElements) нужен, чтобы не делать лишних запросов на сервер
            // и не не обновлять state
            shopAPI.getGoods(currentPage, props.match.params.category)
                .then(({ data, totalCount }) => {
                    setTotalCountGoods(totalCount)
                    setGoods(data)
                    setNewPage()
                    setFetchingGoods(false)
                })
                .catch(e => console.error(e))
            // .finally(() => setFetchingGoods(false))
        }

    }, [fetchingGoods, props.match.params.category])

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


    const modalElements = (data) => {
        let array = []
        for (let i in data) {
            array.push(<SpecModal data={data[i]} name={data[i].nameCategory} key={i} />)
        }
        return array
    }





    return (
        <div>
            <h1>Каталог</h1>

            <div>
                <div style={{ display: 'flex' }}>
                    <div className={styles.filterMenu}>Filter</div>
                    <div className={styles.goodsElementsWrapper} >
                        {
                            goods.length
                                ? (goodsElements)
                                : <div className={styles.loader}>
                                    <Loader />
                                </div>
                        }
                    </div>
                </div>
            </div>

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
                        <div className={styles.aboutGoodsModalImgWrapper}>
                            <img src={modalWindowData.img}
                                alt={modalWindowData.alt}
                                onLoad={() => setIsLoaded(true)}
                                className={isLoaded ? `${styles.imgGoods} ${styles.imgGoodsLoaded}` : styles.imgGoods}
                            />
                        </div>

                        <div className={styles.spectificationGoodsModal}>
                            <div className={styles.specName}>
                                {modalWindowData.name}
                            </div>
                            <div className={styles.spectifications}>
                                {modalWindowData.spectifications
                                    ? modalElements(modalWindowData.spectifications)
                                    : "Данных нет"
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



export default withRouter(Catalog)