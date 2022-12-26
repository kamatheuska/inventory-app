import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

import styles from './layout.module.css';
import { Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    );
}
