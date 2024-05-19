import {
  createOrder,
  createPayWithWallet,
  createRgisteredUserOrder,
  getCurrentUser,
} from "@/services/request";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { setCartOnLoad, setUser } from "@/redux/storeSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function SuccessfulOrder() {
  const {
    shop,
    toggleMode,
    overallTotal,
    userOrderDetails,
    shippingFee,
    cart,
  } = useSelector((state) => state.store);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDark } = toggleMode;

  function handleShop() {
    dispatch(setCartOnLoad());
    router.push("/shop");
  }

  return (
    <main
      className={` h-full flex flex-col w-full px-4 rounded-lg  ${
        isDark ? "" : "bg-[#D1D1D1]"
      }`}>
      <div className=" max-w-[588px] mx-auto my-auto w-full    flex flex-col items-center justify-center px-10 gap-6 py-10">
        <div>
          <BsFillCheckCircleFill className=" text-3xl" />
        </div>

        <h2 className=" normal-case text-center">Your Order was successful </h2>
        <h2 className=" normal-case text-center">
          Check your email to see order details{" "}
          <a href={`mailto:${userOrderDetails.email}`} className="underline">
            Open
          </a>
        </h2>
        <h2 className=" normal-case text-center">
          Please visit the link by clicking on the link below to see your order
          status
        </h2>
        <h2 className=" normal-case text-center">
          <a
            href="https://stewart-frontend-chile4coding.vercel.app/"
            className="underline">
            See status
          </a>
        </h2>

        <button
          className={` btn  btn-outline border normal-case  w-full   px-8 py-4  ${
            isDark
              ? "hover:border-white hover:text-white hover:bg-black bg-white text-black "
              : " bg-black text-white   hover:bg-white hover:text-black hover:border-black"
          }`}
          onClick={handleShop}>
          Shop
        </button>
      </div>
    </main>
  );
}

export default function PaymentDetails() {
  const [paymentStatus, setPaymentSTatus] = useState({
    paymentStat: false,
  });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    shop,
    toggleMode,
    overallTotal,
    userOrderDetails,
    shippingFee,
    cart,
    user,
  } = useSelector((state) => state.store);
  const router = useRouter();
  const { isDark } = toggleMode;
  const [status, setStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const {
    shipping,
    email,
    address,
    city,
    country,
    state,
    deliveryfee,
    firstname,
    lastname,
    phone,
    village,
  } = userOrderDetails;

  useEffect(() => {
    const cookie = Cookies.get("_stewart_collection_token");
    setToken(cookie);

    if (status && status?.status) {
      async function getOrderrequest() {
        //  you can now send request to store the details on the database
        //  clear your cart
        //  also appreciate the user for pursched requests
        //   and redirect the user to the  store page

        if (Boolean(token)) {
          const response = await getCurrentUser(token);
          if (response.status === 200) {
            const user = await response.json();
            dispatch(setUser(user?.user));
          }
        }

        setLoading(true);
        let data;

        if (Boolean(token)) {
          data = await createRgisteredUserOrder(
            {
              email,
              total: Number(overallTotal.toFixed(2)),
              orderitem: [...cart, { paymentMethod: paymentMethod }],
              name: `${firstname} ${lastname}`,
              state,
              city,
              address: `${village} ${address}`,
              status: status.status,
              country,
              shipping: Number(shippingFee.toFixed(2)),
              phone,
              refNo: `${email}`,
              shippingType: Number(shipping) === 50 ? "express" : "standard",
            },
            token
          );
        } else {
          data = await createOrder({
            email,
            total: Number(overallTotal.toFixed(2)),
            orderitem: cart,
            name: `${firstname} ${lastname}`,
            state,
            city,
            address: `${village} ${address}`,
            status: status.status,
            country,
            shipping: Number(shippingFee.toFixed(2)),
            phone,
            refNo: status.transactionReference,

            shippingType: Number(shipping) === 50 ? "express" : "standard",
          });
        }

        if (data?.visitorOrder?.status == "SUCCESS") {
          setPaymentSTatus({
            ...paymentStatus,
            paymentStat: true,
          });
          setLoading(false);

          dispatch(setCartOnLoad());
        } else {
          setPaymentSTatus({
            ...paymentStatus,
            paymentStat: false,
          });

          setLoading(false);
        }
      }

      getOrderrequest();
    }
  }, [status]);

  function handlePaymentMethod(e) {
    const { value } = e.target;
    setPaymentMethod(value);
  }

  // const config = {
  //   amount: `${parseInt(overallTotal)}`,
  //   currency: "NGN",
  //   reference: new String(new Date().getTime()),
  //   customerFullName: `${userOrderDetails.firstname} ${userOrderDetails.lastname}`,
  //   customerEmail: `${userOrderDetails.email}`,
  //   apiKey: process.env.NEXT_PUBLIC_MONI_API_KEY,
  //   contractCode: process.env.NEXT_PUBLIC_contractCode,
  //   paymentDescription: "Pay for your order",
  //   metadata: {
  //     name: `${userOrderDetails.firstname} ${userOrderDetails.lastname}`,
  //   },
  //   paymentMethods: ["CARD"],
  // };

  // const componentProps = {
  //   ...config,
  //   onSuccess: (response) => console.log("==========="),
  //   onClose: (response) => console.log("hello======"),
  // };

  // const initializePayment = useMonnifyPayment(componentProps);

  function payWithMonnify() {
    MonnifySDK.initialize({
      amount: `${parseInt(overallTotal)}`,
      currency: "NGN",
      reference: new String(new Date().getTime()),
      customerFullName: `${userOrderDetails.firstname} ${userOrderDetails.lastname}`,
      customerEmail: `${userOrderDetails.email}`,
      apiKey: process.env.NEXT_PUBLIC_MONI_API_KEY,
      contractCode: process.env.NEXT_PUBLIC_contractCode,
      paymentDescription: "Pay for your order",
      metadata: {
        name: `${userOrderDetails.firstname} ${userOrderDetails.lastname}`,
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],

      onLoadStart: () => {
        console.log("loading ");
      },
      onLoadComplete: () => {
        console.log("SDK is UP");
      },

      onComplete: function (response) {
        const data = response;
        setStatus(data);

        //Implement what happens when the transaction is completed.
      },
      onClose: function (data) {
        //Implement what should happen when the modal is closed here

        setStatus(data);
      },
    });
  }
  async function payWithWallet(token) {
    const {
      shipping,
      email,
      address,
      city,
      country,
      state,
      deliveryfee,
      firstname,
      lastname,
      phone,
      village,
    } = userOrderDetails;

    if (!token) {
      toast.error(
        <div className=" normal-case">
          Please you cannot pay with wallet, register or login your account to
          be enabled
        </div>
      );
      return;
    }
    setLoading(true);
    const data = await createOrder({
      email,
      total: Number(overallTotal.toFixed(2)),
      orderitem: [...cart, { paymentMethod: paymentMethod }],
      name: `${firstname} ${lastname}`,
      state,
      city,
      address: `${village} ${address}`,
      status: status.status,
      country,
      shipping: Number(shippingFee.toFixed(2)),
      phone,
      refNo: status.transactionReference,

      shippingType: Number(shipping) === 50 ? "express" : "standard",
    });

    if (data?.visitorOrder?.status == "SUCCESS") {
      setPaymentSTatus({
        ...paymentStatus,
        paymentStat: true,
      });
      setLoading(false);

      dispatch(setCartOnLoad());
    } else {
      setPaymentSTatus({
        ...paymentStatus,
        paymentStat: false,
      });

      setLoading(false);
    }
  }
  async function payOnDelivery(token) {
    const {
      shipping,
      email,
      address,
      city,
      country,
      state,
      deliveryfee,
      firstname,
      lastname,
      phone,
      village,
    } = userOrderDetails;

    if (token) {
      setLoading(true);
      const data = await createRgisteredUserOrder(
        {
          email,
          total: Number(overallTotal.toFixed(2)),
          orderitem: [...cart, { paymentMethod: paymentMethod }],
          name: `${firstname} ${lastname}`,
          state,
          city,
          address: `${village} ${address}`,
          status: "PAY ON DELIVERY",
          country,
          shipping: Number(shippingFee.toFixed(2)),
          phone,
          refNo: `${email}`,

          shippingType: Number(shipping) === 50 ? "express" : "standard",
        },
        token
      );

      if (data?.visitorOrder?.status == "PAY ON DELIVERY") {
        setPaymentSTatus({
          ...paymentStatus,
          paymentStat: true,
        });
        setLoading(false);

        dispatch(setCartOnLoad());
      } else {
        setPaymentSTatus({
          ...paymentStatus,
          paymentStat: false,
        });

        setLoading(false);
      }
    } else {
      setLoading(true);
      const data = await createOrder({
        email,
        total: Number(overallTotal.toFixed(2)),
        orderitem: [...cart, { paymentMethod: paymentMethod }],
        name: `${firstname} ${lastname}`,
        state,
        city,
        address: `${village} ${address}`,
        status: "PAY ON DELIVERY",
        country,
        shipping: Number(shippingFee.toFixed(2)),
        phone,
        refNo: `${email}`,

        shippingType: Number(shipping) === 50 ? "express" : "standard",
      });

      if (data?.visitorOrder?.status == "PAY ON DELIVERY") {
        setPaymentSTatus({
          ...paymentStatus,
          paymentStat: true,
        });
        setLoading(false);

        dispatch(setCartOnLoad());
      } else {
        setPaymentSTatus({
          ...paymentStatus,
          paymentStat: false,
        });

        setLoading(false);
      }
    }
  }

  async function payWithWallet(token) {
    const {
      shipping,
      email,
      address,
      city,
      country,
      state,
      deliveryfee,
      firstname,
      lastname,
      phone,
      village,
    } = userOrderDetails;

    setLoading(true);

    const response = await createPayWithWallet(
      {
        email,
        total: Number(overallTotal.toFixed(2)),
        orderitem: [...cart, { paymentMethod: paymentMethod }],
        name: `${firstname} ${lastname}`,
        state,
        city,
        address: `${village} ${address}`,
        status: "SUCCESS",
        country,
        shipping: Number(shippingFee.toFixed(2)),
        phone,
        refNo: `${email}`,

        shippingType: Number(shipping) === 50 ? "express" : "standard",
      },
      token
    );

    const data = await response.json();

    if (response.status === 200) {
      toast.success(<div className=" lowercase ">{data.message}</div>);

      if (data?.order?.status == "SUCCESS") {
        setPaymentSTatus({
          ...paymentStatus,
          paymentStat: true,
        });
        setLoading(false);

        dispatch(setCartOnLoad());
      } else {
        setPaymentSTatus({
          ...paymentStatus,
          paymentStat: false,
        });

        setLoading(false);
      }
    } else {
      toast.error(<div className=" lowercase text-[red]">{data.message}</div>);
      setLoading(false);
    }
  }

  function pay() {
    if (paymentMethod === "card") {
      // initializePayment();
      payWithMonnify();
    } else if (paymentMethod === "wallet") {
      if (Boolean(token)) {
        payWithWallet(token);
      } else {
        toast.error(
          <div className=" normal-case  text-[red]">
            Please Login to your account and pay again
          </div>
        );
      }
      console.log("wallet");
    } else if (paymentMethod === "delivery") {
      if (Boolean(token)) {
        payOnDelivery(token);

        // console.log("I have yoken now")
      } else {
        payOnDelivery();
        // console.log("I do not have token")
      }
    } else {
      toast.error(
        <div className=" normal-case">Please selct a payment method</div>
      );
    }
  }

  function handleLogin() {
    router.push("/login");
  }

  return (
    <div className=" sm:pb-4">
      {loading && !paymentStatus.paymentStat && "Processing Order "}
      {loading && !paymentStatus.paymentStat && <Spinner />}

      {paymentStatus.paymentStat && <SuccessfulOrder />}
      {!paymentStatus.paymentStat && !loading && (
        <div className="my-14">
          <h2 className=" text-[18px] font-semibold leading-6 mb-5">
            Payment methods
          </h2>

          <div className="leading-6 mb-5 ">
            <input
              type="radio"
              name="radio-7"
              className=" cursor-pointer"
              value="card"
              onChange={handlePaymentMethod}
              id="card"
            />
            <label htmlFor="card" className="mx-4  cursor-pointer">
              Card
            </label>
          </div>
          <div className="leading-6 mb-5">
            <input
              type="radio"
              name="radio-7"
              className=" cursor-pointer"
              id="wallet"
              onChange={handlePaymentMethod}
              value="wallet"
            />
            <label htmlFor="wallet" className="mx-4 cursor-pointer">
              Wallet Account
            </label>
          </div>
          <div className="leading-6 mb-5">
            <input
              type="radio"
              name="radio-7"
              className=" cursor-pointer"
              id="wallet"
              onChange={handlePaymentMethod}
              value="delivery"
            />
            <label htmlFor="wallet" className="mx-4 cursor-pointer">
              Pay on delivery
            </label>
          </div>

          <button
            onClick={pay}
            className={`btn  shadow-md   capitalize sm:my-4 w-full   mx-auto ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black"
            }`}>
            Pay Now
          </button>

          {paymentMethod === "wallet" && (
            <h2 className=" mt-4">
              {user && user?.wallet?.amount.toFixed(2) && (
                <span className=" font-bold">
                  {" "}
                  Wallet Balance: ₦{user && user?.wallet?.amount.toFixed(2)}
                </span>
              )}

              {!user?.wallet?.amount.toFixed(2) && (
                <span
                  className=" underline cursor-pointer"
                  onClick={handleLogin}>
                  Login
                </span>
              )}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
