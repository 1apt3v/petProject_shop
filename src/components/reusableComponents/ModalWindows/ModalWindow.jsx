import React from 'react';
import styles from './modalWindow.module.css'

const ModalWindow = ({ active, setActive, children, ...props }) => {
    return (
        <div className={active ? `${styles.modalWindow} ${styles.active}` : styles.modalWindow} onClick={() => {
            setActive(false)
            props.setModalWindowData('')
            props.setIsLoaded(false)
        }}>
            <div className={styles.modalWindow__content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;