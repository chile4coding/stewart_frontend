import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import AppLayoout from '@/components/Layout/AppLayoout'
import SingleItem from '@/components/singleItem/SingleItem'
import { useDispatch, useSelector } from 'react-redux'
import { getSimilarItems } from '@/redux/storeSlice'


export default function ItemDescription() {
    const router  = useRouter()
        const {
          shop,
          toggleMode,
          singleProduct,
          products: product,
          similarItems,
        } = useSelector((state) => state.store);
        const { isDark } = toggleMode;

        const dispatch  = useDispatch()


        useEffect(() => {
          if (singleProduct) {
            const { category_id } = singleProduct;

            dispatch(getSimilarItems(category_id));
          }

          const handleRouteChange = (url) => {
            // Perform actions specific to the URL change
            console.log("URL changed to: ", url);

            // Reload data or trigger a specific function upon URL change
            // For example:
            // fetchData();
          };

          router.events.on("routeChangeComplete", handleRouteChange);
          return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
          };
        }, [router.asPath, router.events]);


 
  return (
    <AppLayoout>
      <div className=" p-10 sm:px-4">
        {singleProduct && (
          <SingleItem
            singleItem={singleProduct}
            similarProduct={similarItems}
          />
        )}
      </div>
    </AppLayoout>
  );
}
