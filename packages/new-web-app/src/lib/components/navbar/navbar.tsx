import { Link, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';
import { IoMenuOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import classNames from '../../utils/classNames';

export default function Navbar() {
    const [isNavActive, setIsNavActive] = useState(false);
    const location = useLocation();

    const navClasses = classNames({
        [styles.nav]: true,
        [styles.active]: isNavActive,
        [styles.full]: isNavActive,
    });

    useEffect(() => {
        setIsNavActive(false);
    }, [location]);

    return (
        <div className={styles.root}>
            <div className={styles.logo}>
                <Link to="/">Inventory App</Link>
            </div>
            <div className={styles.icon} onClick={() => setIsNavActive(!isNavActive)}>
                <IoMenuOutline size="50px"></IoMenuOutline>
            </div>
            <nav className={navClasses}>
                <Link className={styles.home_link} to="/">
                    Home
                </Link>
                <Link to="/storage">Storage</Link>
                <Link to="/ingredients">Ingredients</Link>
            </nav>
        </div>
    );
}
