import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AppLayout from "@/components/Layout/AppLayout";
import SingleItem from "@/components/singleItem/SingleItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getSimilarItems,
  getSingleProduct,
  setGlobalLoading,
  storeGetProducts,
} from "@/redux/storeSlice";
import { MetaDataC } from "../orders";
import useGetSingleProduct from "@/components/hooks/useGetSingleProduct";
import useGetProducts from "@/components/hooks/useGetProducts";
import { useQuery } from "react-query";
import { productSingle } from "@/services/request";

export default function ItemDescription() {
  const router = useRouter();
  const {
    shop,
    toggleMode,
    singleProduct,
    products: product,
    similarItems,
  } = useSelector((state) => state.store);
  const { isDark } = toggleMode;

  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["get-product", router.query?.id],
    queryFn: async () => {
      try {
        const products = await productSingle(
          router.query.id ? router?.query?.id : null
        );

        dispatch(setGlobalLoading(true));
        dispatch(storeGetProducts(products?.similarProducts));
        return products;
      } catch (error) {
        throw error;
      }
    },
  });

  // const {
  //   data: productData,
  //   error: productError,
  //   isloading: productLoading,
  // } = useGetProducts();

  // const { data, error, isLoading } = useGetSingleProduct(
  //   router?.query?.id ? router?.query?.id : null
  // );

  // console.log(data);

  // useEffect(() => {
  //   if (data && productData?.length > 0) {
  //     dispatch(storeGetProducts(productData));

  //     dispatch(getSingleProduct(data.id));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (singleProduct) {
  //     const { category_id } = singleProduct;

  //     dispatch(getSimilarItems(category_id));
  //   }

  //   const handleRouteChange = (url) => {
  //     // Perform actions specific to the URL change
  //     console.log("URL changed to: ", url);

  //     // Reload data or trigger a specific function upon URL change
  //     // For example:
  //     // fetchData();
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.asPath, router.events]);

  return (
    <>
      <MetaDataC title={data?.products?.name} />
      <AppLayout>
        <div className=" p-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
          {data?.products && (
            <SingleItem
              singleItem={data?.products || {}}
              similarProduct={data?.similarProducts || []}
            />
          )}
        </div>
      </AppLayout>
    </>
  );
}
