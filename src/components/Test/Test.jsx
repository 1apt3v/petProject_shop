import React, { useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import style from './test.module.css'

const Menu = ({ name, links }) => {
    const [display, setDisplay] = useState(false)

    return (
        <div className={style.menu} onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
            <div className={style.menu__name}>
                {name}
            </div>
            <div className={style.menu__submenu} style={display ? { display: 'block' } : { display: 'none' }} >
                <h3>{name}</h3>
                <div className={style.menu__name}>
                    {links.map(link => {
                        return <NavLink key={link.nameLink} to={link.link}>
                            {link.nameLink}
                        </NavLink>
                    })}
                </div>
            </div>
        </div>

    )
}

const RootMenu = ({ data }) => {
    return (
        <div className={style.root__menu}>
            {data.map(link => <Menu key={link.name} name={link.name} links={link.links} />)}
        </div>
    )
}

const DisplayComponent = () => {
    return (
        <div className={style.displayComponent}>SMARTPHONE</div>
    )
}


const Test = (props) => {
    const data = [
        {
            name: 'Смартфоны и гаджеты',
            links: [
                { nameLink: 'Смартфоны', link: '/test/smartphones' }
            ]
        },
        {
            name: 'Компьютеры и периферия',
            links: [
                { nameLink: 'Компьютеры', link: '/test/computers' }
            ]
        }
    ]

    return (
        <div className={style.test}>
            <RootMenu data={data} />

            <Route path='/test/smartphones' render={() => <DisplayComponent />} />

        </div>
    );
};

export default Test;