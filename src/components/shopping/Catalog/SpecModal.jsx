import React from 'react';
import styles from './catalog.module.css'

const SpecModal = ({ data, name }) => {

    const specFunc = (obj) => {
        let array = []
        for (let key in obj) {
            array.push(obj[key])
        }
        return array


    }

    return (
        <div className={styles.spectification}>
            <div className={styles.title}>{name}</div>
            <div>{specFunc(data)
                .map((item) => <div className={styles.body} key={item[0]}>
                    <div className={styles.bodyKey}>{item[0]}</div>
                    <div className={styles.bodyValue}>{item[1]}</div>
                </div>)}
            </div>
        </div>
    );
};

export default SpecModal;