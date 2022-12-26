import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.root}>
            <div className={styles.logo}>
                <Link to="/">Inventory App</Link>
            </div>
            <nav className={styles.nav}>
                <Link to="/storage">Storage</Link>
                <Link to="/ingredients">Ingredients</Link>
            </nav>
        </div>
    );
}
