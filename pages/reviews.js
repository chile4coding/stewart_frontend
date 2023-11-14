import UserLayout from "@/components/userDashboardLayout/UserLayout";
import ReviewDetails from "@/components/userDashboardLayout/reviews/ReviewDetails";
import { setUser } from "@/redux/storeSlice";
import { getCurrentUser } from "@/services/request";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Reviews() {
    const { user, toggleMode, orders, orderDetails } = useSelector(
      (state) => state.store
    );
  const dispatch = useDispatch();
  useEffect(() => {
    async function handleUser() {
      const response = await getCurrentUser(token);
      if (response.status === 200) {
        const user = await response.json();
        dispatch(setUser(user?.user));
      }
    }
  }, [user]);
  return (
    <UserLayout>
      <div className=" px-10 sm:px-4">
        <ReviewDetails />
      </div>
    </UserLayout>
  );
}
