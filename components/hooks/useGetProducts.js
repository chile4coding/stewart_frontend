import { storeGetProducts } from "@/redux/storeSlice";
import { getShopProducts } from "@/services/request";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useGetProducts() {
  const [prod, setProd] = useState({
    error: null,
    data: [],
    isloading: false,
  });

  useEffect(() => {
    async function getProd() {
      try {
        setProd({ ...prod, error: false, isloading: true });
        const { products } = await getShopProducts();
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
