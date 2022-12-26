import { Link } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import CircleButtonIcon from '../components/buttons/circle-button-icon';
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
                    <div>
                        <CircleButtonIcon label="Add movement" variant="primary">
                            <Link to="/movements/add">
                                <IoAdd size="30px" />
                            </Link>
                        </CircleButtonIcon>
                    </div>
                </header>
                <MovementsList />
            </div>
        </div>
    );
}

export default Home;
