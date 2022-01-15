import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { shopAPI } from './../../api/api'
import ElementsData from './ElementsData';

const Component = ({ goods, setGoods, setDefaultValueArrayGoods, currentPage, setNewPage, ...props }) => {

    const [category, setCategory] = useState('')
    const [fetchingGoods, setFetchingGoods] = useState(true)

    useEffect(() => {
        console.log(category, props.match.params.category)
        if (category !== props.match.params.category) {
            console.log('123');
            setCategory(props.match.params.category)
            setDefaultValueArrayGoods()
            setFetchingGoods(true)
        }

        if (fetchingGoods === true) {
            shopAPI.getGoods(currentPage, props.match.params.category)
                .then(({ data, totalCount }) => {
                    setGoods(data)
                    setNewPage()
                })
                .finally(() => setFetchingGoods(false))
        }

    }, [fetchingGoods, props.match.params.category])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])



    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            // console.log('scroll');
            setFetchingGoods(true)
        }
    }

    // console.log(goods)

    let elements = goods.map(el => <ElementsData key={el.id} el={el} />)

    // console.log(props.match.params.category)
    // console.log(elements)
    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            {elements}
        </div>
    );
};

export default withRouter(Component);