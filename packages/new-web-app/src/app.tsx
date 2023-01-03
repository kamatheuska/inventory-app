import { Route, Routes } from 'react-router-dom';
import IngredientsIndex from './ingredients/views/ingredients-index';
import Layout from './lib/components/layout/layout';
import Home from './lib/views/home';
import StorageItemIndex from './storage/views/storage-item-index';
import StorageItemView from './storage/views/storage-item-view';
import StorageItemAdd from './storage/views/storage-item-add';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="storage" element={<StorageItemIndex />} />
                    <Route path="storage/items/add" element={<StorageItemAdd />} />
                    <Route path="storage/items/:itemId" element={<StorageItemView />} />
                    <Route path="ingredients" element={<IngredientsIndex />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
