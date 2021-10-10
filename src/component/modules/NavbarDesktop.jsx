import React, { useState } from 'react'
import Link from 'next/link'
import styles from "../../styles/Layout.module.css";
import layout from '../../styles/Home.module.css'
import Button from '@material-ui/core/Button';
import MenuIcon from '@mui/icons-material/Menu';

function NavbarDesktop() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className={layout.header}>
            <nav className={styles.navbar}>
                <Link href='/'>
                    <a className={styles.navlogo}>Logo</a>
                </Link>
                <ul className={isOpen === false ?
                    styles.navmenu : styles.navmenu + ' ' + styles.active}>
                    <li className={styles.navitem}>
                        <Link href='/markaz'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={toggleMenu}>Markaz</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/santri'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={toggleMenu}>Santri</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/volunteer'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={toggleMenu}>Volunteer</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/pengajar'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={toggleMenu}>Pengajar</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/kelas'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={toggleMenu}>Kelas</a>
                        </Link>
                    </li>
                </ul>
                <MenuIcon className={isOpen === false ?
                    styles.hamburger : styles.hamburger + ' ' + styles.active}
                    onClick={toggleMenu}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </MenuIcon>
            </nav>
        </header>
    )
}

export default NavbarDesktop
