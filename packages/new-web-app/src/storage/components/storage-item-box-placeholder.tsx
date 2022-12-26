import styles from './storage-item-box.module.css';

import { IoAdd } from 'react-icons/io5';
import classNames from '../../lib/utils/classNames';

export default function StorageItemBoxPlaceholder() {
    return (
        <div className={classNames(styles.root, styles.placeholder)} data-cy="storage-item-box">
            <IoAdd size="30px" />
            <p>Add one</p>
        </div>
    );
}
