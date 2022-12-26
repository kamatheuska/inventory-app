import { ReactElement } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../lib/components/layout/layout";
import { useFetchStorageItem } from "../../../lib/storage/storage.hooks";
import { getCurrent, getIsLoading } from "../../../lib/storage/storageItemSlice";
import { NextPageWithLayout } from "../../_app";
import StorageItemView from "../../../lib/storage/components/storage-item-view";


const StorageItemDetail: NextPageWithLayout = () => {
  const isLoading = useSelector(getIsLoading)
  const storageItem = useSelector(getCurrent)
  
  return (
    <div>
      <div>isLoading:
         <code>
        {`${isLoading}`}
        </code>
        </div>
      { isLoading 
        ? <div>Loading...</div>
        : !!storageItem && (
        <div>
          <StorageItemView {...storageItem}/> 
        </div>
      )}
    </div>
  )
}


StorageItemDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default StorageItemDetail