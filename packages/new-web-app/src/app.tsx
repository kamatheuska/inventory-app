import { Route, Routes } from 'react-router-dom';
import Layout from './lib/components/layout/layout';
import Home from './lib/views/home';
import StorageItemIndex from './storage/views/storage-item-index';
import StorageItemView from './storage/views/storage-item-view';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="storage" element={<StorageItemIndex />} />
                    <Route path="storage/items/:itemId" element={<StorageItemView />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
