import { storeGetProducts } from "@/redux/storeSlice";
import { getShopProducts, getSingleProduct } from "@/services/request";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useGetSingleProduct(id) {
  const [prod, setProd] = useState({
    error: null,
    data: {},
    isloading: false,
  });

  if (id === null) {
    return prod;
  }

  useEffect(() => {
    async function getProd() {
      try {
        setProd({ ...prod, error: false, isloading: true });
        const { products } = await singleProduct(id);
        setProd({ ...prod, data: products, error: false, isloading: false });
        return { products };
      } catch (error) {
        setProd({ ...prod, error: error, isloading: false });
      }
    }

    getProd();
  }, []);

  return prod;
}
