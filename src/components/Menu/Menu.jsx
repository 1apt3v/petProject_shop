import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import style from './menu.module.css'

const Menu = ({ name, links, setIsMenuDisplay }) => {
    const [display, setDisplay] = useState(false)
    return (
        <div className={style.menu} onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
            <div className={style.menu__name}>
                {name}
            </div>
            <div className={style.menu__submenu} style={display ? { display: 'block' } : { display: 'none' }} >
                <h3>{name}</h3>
                <div className={style.menu__name} >
                    {links.map(link => {
                        return <NavLink key={link.nameLink} to={link.link} onClick={() => setIsMenuDisplay(false)} >
                            {link.nameLink}
                        </NavLink>
                    })}
                </div>
            </div>
        </div>

    )
}

const RootMenu = ({setIsMenuDisplay}) => {
    const data = [
        {
            name: 'Смартфоны и гаджеты',
            links: [
                { nameLink: 'Смартфоны', link: '/shop/smartphone' }
            ]
        },
        {
            name: 'Компьютеры и периферия',
            links: [
                { nameLink: 'Компьютеры', link: '/shop/computers' }
            ]
        }
    ]

    return (
        <div className={style.root__menu}>
            {data.map(link => <Menu key={link.name} name={link.name} links={link.links} setIsMenuDisplay={setIsMenuDisplay} />)}
        </div>
    )
}

export default RootMenu
