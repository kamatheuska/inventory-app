import { useSelector } from 'react-redux';

import MovementsList from '../../movements/components/movements-list';

import { useFetchMovements } from '../../movements/movements.hooks';
import { getIsLoading } from '../../movements/movementSlice';

import styles from './home.module.css';

function Home() {
    useFetchMovements();
    const isLoading = useSelector(getIsLoading);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div data-cy="home-page">
            <div className={styles.root}>
                <header>
                    <h1>Movements</h1>
                </header>
                <MovementsList />
            </div>
        </div>
    );
}

export default Home;
