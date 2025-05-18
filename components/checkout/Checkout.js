import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  calculateDistance,
  getAllCountry,
  getAllCountryState,
  getSTateCities,
  getUserDistance,
  isShippingAddressIncomplete,
} from "@/services/request";
import { calCulateShippingFee, setUserOrderDetails } from "@/redux/storeSlice";
import { isEmpty } from "lodash";
import currency from "currency.js";
export function Order() {
  // const isDark = useSelector((state) => state.store.toggleMode.isDark);
  const { toggleMode, cart, cartTotal, shippingFee, overallTotal } =
    useSelector((state) => state.store);
  const { isDark } = toggleMode;

  return (
    <div className="  flex  flex-col   my-14 sm:mb-4  md:order-1 sm:order-1">
      <div
        className={`card bg-[#212121]  px-10 py-6 ${
          isDark ? "text-[#F8F8F8] " : "bg-[#D9D9D9]"
        }`}>
        <h1 className=" border-b border-[#6b6b6b] text-[18px] font-semibold text-center py-4">
          Your Order
        </h1>
        {cart &&
          cart.length > 0 &&
          cart.map((item) => (
            <div
              className="grid grid-cols-5  sm:grid-cols-5  py-8 sm:mt-0 sm:pt-4 sm:pb-0"
              key={item.image}>
              <div className="indicator">
                <span className="indicator-item  font-semibold  badge ">
                  {item.qty}
                </span>
                <div className="place-items-center ">
                  <img
                    src={item.image}
                    className=" rounded-md object-cover max-w-[70px] sm:max-w-[40px] bg-[#c0bebe]"
                  />
                </div>
              </div>
              <h2 className="  col-span-3  sm:text-[10px]  self-center lowercase">
                {`${item.name} ${item.initial_color} ${item.initial_size}`}
              </h2>

              <h2 className=" justify-self-end  self-center sm:text-[10px]  font-semibold ">
                {currency(item.subTotal).format({
                  symbol: "₦",
                  decimal: ".",
                  separator: ",",
                })}
              </h2>
            </div>
          ))}

        <div className="grid grid-cols-2    my-4 sm:my-0 sm:mt-4  text-[18px] font-normal">
          <h2 className=" sm:self-center sm:text-[14px] font-semibold">
            SubTotal
          </h2>
          <h2 className=" justify-self-end self-center sm:text-[14px] font-semibold  text-[18px] ">
            {currency(cartTotal).format({
              symbol: "₦",
              decimal: ".",
              separator: ",",
            })}
          </h2>
        </div>
        <div className="grid grid-cols-2   my-4 sm:my-1 sm:text-[14px] font-semibold  text-[18px] ">
          <h2>Shipping</h2>
          <h2 className=" justify-self-end self-center sm:text-[14px] font-semibold">
            {currency(shippingFee).format({
              symbol: "₦",
              decimal: ".",
              separator: ",",
            })}
          </h2>
        </div>
        <div className="grid grid-cols-2  my-4 sm:my-1  text-[18px] sm:text-[14px] font-semibold">
          <h2>Total</h2>
          <h2 className=" justify-self-end self-center sm:text-[14px] font-semibold">
            {currency(overallTotal).format({
              symbol: "₦",
              decimal: ".",
              separator: ",",
            })}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  const { toggleMode, overallTotal, shippingFee, cart, userOrderDetails } =
    useSelector((state) => state.store);

  const { isDark } = toggleMode;

  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    country: "",
    city: "",
    address: "",
    village: "",
    state: "",
    phone: "",
    email: "",
    shipping: "",
    countries: [],
    states: [],
    cities: [],
  });

  const [loadingShippingCOst, setloadingSHippingCost] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  async function getLocationFromAddress(shipping) {
    const address = `${shippingAddress.city}  ${shippingAddress.state
      .split(",")[0]
      .trim()} ${shippingAddress.country.split(",")[0]}`; // Replace this with the desired address

    try {
      setloadingSHippingCost(true);
      const data = await getUserDistance(address);

      setloadingSHippingCost(false);

      if (data?.lat && data?.lon) {
        // Example usage:
        const userAddress = {
          latitude: Number(data?.lat),
          longitude: Number(data?.lon),
        }; // User's address coordinates
        const destination = { latitude: 4.74974, longitude: 6.82766 }; // Given destination coordinates
        const distance = calculateDistance(
          userAddress.latitude,
          userAddress.longitude,
          destination.latitude,
          destination.longitude
        );

        const fee = distance * Number(shipping);

        dispatch(calCulateShippingFee(fee));
      } else {
        setloadingSHippingCost(false);

        toast.error(
          <h2 className=" normal-case">
            We can't supply to this location at this moment, please select
            another location
          </h2>
        );
      }
    } catch (error) {
      setloadingSHippingCost(false);

      toast.error(
        <h2 className=" normal-case">Please select another addess</h2>
      );
    }
  }

  useEffect(() => {
    async function getCountries() {
      if (shippingAddress.countries.length < 1) {
        const country = await getAllCountry();

        setShippingAddress({ ...shippingAddress, countries: country });

        return;
      }

      if (shippingAddress?.countries?.length > 0) {
        const state = await getAllCountryState(
          shippingAddress?.country?.split(",")[1]
        );
        setShippingAddress({ ...shippingAddress, states: state });
      }
    }

    getCountries();
    const checkAddress = Boolean(
      shippingAddress.country && shippingAddress.city && shippingAddress.state
      //  &&
      // shippingAddress.address &&
      // shippingAddress.village
    );

    if (!checkAddress) {
      return;
    }

    if (Boolean(shippingAddress.shipping)) {
      getLocationFromAddress(shippingAddress.shipping);
    }
  }, [shippingAddress.city, shippingAddress.country, shippingAddress.state]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  }

  function handlePayment() {
    let status;

    for (let key in shippingAddress) {
      if (isEmpty(shippingAddress[key])) {
        status = true;
        toast.error(
          <div className=" lowercase">{`Please fill in ${key} field`}</div>
        );
        break;
      }
      status = false;
    }

    if (status) {
      return;
    }

    dispatch(
      setUserOrderDetails({
        ...shippingAddress,
        deliveryfee: parseInt(shippingFee),
      })
    );

    router.push("/payment");
  }

  async function handleStates(e) {
    const { name, value } = e.target;

    const st = value;

    const city = await getSTateCities(
      shippingAddress.country.split(",")[1],
      value.split(",")[1]
    );

    if (city.length > 0) {
      setShippingAddress({ ...shippingAddress, state: st, cities: city });
    }
  }

  async function handleCity(e) {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  }

  return (
    <div className=" grid grid-cols-2 sm:grid-cols-1 gap-14 sm:gap-0 md:grid-cols-1  px-10 sm:px-4">
      <div className="md:order-2 sm:order-2">
        <h2 className="text-[18px] font-semibold my-7">Shipping Address</h2>
        <div className="grid  grid-cols-2 gap-4 sm:grid-cols-1">
          <input
            type="text"
            placeholder="First Name"
            autoComplete={"off"}
            name="firstname"
            onChange={handleInputChange}
            value={shippingAddress.firstname}
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
          <input
            type="text"
            placeholder="Surname"
            name="lastname"
            onChange={handleInputChange}
            value={shippingAddress.lastname}
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>

        <div className=" my-8   ">
          <select
            name="country"
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
            onChange={handleInputChange}
            value={shippingAddress.country}>
            <option>Select a country</option>
            {shippingAddress.countries.map((country) => (
              <option value={[country.name, country.iso2]}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" my-8   ">
          <select
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
            onChange={handleStates}
            name="state"
            value={shippingAddress.state}>
            <option>Select a state</option>
            {shippingAddress.states.length > 0 &&
              shippingAddress.states.map((state) => (
                <option value={[state.name, state.iso2]}>{state.name}</option>
              ))}
          </select>
        </div>
        <div className=" my-8   ">
          <select
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
            onChange={handleCity}
            name="city">
            <option value={shippingAddress.city}>Select a city</option>
            {shippingAddress.cities.length > 0 &&
              shippingAddress.cities.map((city) => (
                <option value={city.name}>{city.name}</option>
              ))}
          </select>
        </div>

        <div className=" my-8   ">
          <input
            type="text"
            name="village"
            onChange={handleInputChange}
            value={shippingAddress.village}
            placeholder="Village / Nearest bus stop or landmark"
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>

        <div className=" my-8   ">
          <input
            type="text"
            name="address"
            onChange={handleInputChange}
            value={shippingAddress.address}
            placeholder="Address"
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            name="phone"
            onChange={handleInputChange}
            value={shippingAddress.phone}
            placeholder="Phone number"
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" my-8   ">
          <input
            type="text"
            placeholder="Email address"
            name="email"
            onChange={handleInputChange}
            value={shippingAddress.email}
            className={`input input-bordered  w-full ${
              isDark ? " bg-black border-white " : " text-black  border-black"
            }`}
          />
        </div>

        <div className=" grid  grid-cols-2 sm:grid-cols-1 my-4 ">
          <div className=" flex  gap-4">
            <h2 className=" ">Shipping</h2>
            <div className="  flex  items-center gap-2">
              <input
                type="radio"
                name="shipping"
                disabled={
                  loadingShippingCOst ||
                  isShippingAddressIncomplete(shippingAddress)
                }
                onChange={(e) => {
                  handleInputChange(e);
                  getLocationFromAddress(e?.target?.value);
                }}
                value="50"
                className="radio radio-info"
                style={{ transform: "scale(1)" }}
              />
              <span>Express </span>
            </div>
          </div>

          {
            <h2 className=" justify-self-end">
              {currency(shippingFee).format({
                symbol: "₦",
                decimal: ".",
                separator: ",",
              })}
            </h2>
          }
        </div>
        <div
          className={`grid  grid-cols-2 sm:grid-cols-1 my-4  py-4 ${
            isDark ? "border-b-2 border-white" : "border-b-2 border-[#212121]"
          }`}>
          <div className=" flex   gap-20 ">
            <h2 className="  justify-self-end"></h2>
            <div className=" flex gap-2 items-center">
              <input
                type="radio"
                disabled={
                  loadingShippingCOst ||
                  isShippingAddressIncomplete(shippingAddress)
                }
                name="shipping"
                onChange={(e) => {
                  handleInputChange(e);

                  getLocationFromAddress(e?.target?.value);
                }}
                value="35"
                className="radio radio-info"
                style={{ transform: "scale(1)" }}
              />
              <span>Standard</span>
            </div>
          </div>
          <h2 className=" justify-self-end"></h2>
        </div>
        <div className=" grid grid-cols-2">
          <h2>Total</h2>
          {
            <h2 className=" justify-self-end">
              {currency(overallTotal).format({
                symbol: "₦",
                decimal: ".",
                separator: ",",
              })}
            </h2>
          }
        </div>
        <div className="flex gap-2 my-8">
          <input type="checkbox" className=" cursor-pointer" />
          <span className=" normal-case">
            Remember this information for next time
          </span>
        </div>
        <div className="  flex justify-center mb-24">
          <button
            className={`  btn  shadow-md   capitalize sm:my-4   mx-auto ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}
            onClick={handlePayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
      <div>
        <Order />
        <h2 className=" text-justify normal-case">
          <span className=" font-bold"> Note: </span> Express usuallly takes 4 -
          5 working days to be delivered
        </h2>
        <h2 className=" text-justify normal-case">
          Standard usuallly takes 6 - 7 working days to be delivered
        </h2>
      </div>
    </div>
  );
}
