import { data } from "autoprefixer";
import axios from "axios";
import Cookies from "js-cookie";
// const base_url = "http://localhost:5000/api/v1";
const base_url = "https://stewart-r0co.onrender.com/api/v1";

export async function createCategory(productPhoto, category, bearerId) {
  try {
    const response = await fetch(`${base_url}/create_category`, {
      method: "POST",

      body: JSON.stringify({ name: category, productImage: productPhoto }),

      headers: {
        Authorization: `Bearer ${bearerId}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function createProduct(productDetails, bearerId) {
  const {
    name,
    description,
    productImage,
    price,
    discount,
    initialSize,
    initialColor,
    productId,
    salesPrice,
    categoryId,
    short_desc,
  } = productDetails;

  try {
    const response = await fetch(`${base_url}/create_product`, {
      body: JSON.stringify({
        categoryId,
        name: name,
        price: price,
        discount: discount,
        initialSize: initialSize,
        initialColor: initialColor,
        description: description,
        productId: productId,
        salesPrice: salesPrice,
        short_desc,
        image_url: productImage,
      }),

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerId}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(`${base_url}/get_category`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getShopProducts() {
  try {
    const { data } = await axios.get(`${base_url}/get_products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getProductSizes() {
  try {
    const { data } = await axios.get(`${base_url}/get_sizes`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getProductColors() {
  try {
    const { data } = await axios.get(`${base_url}/get_color`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function createProductSize(productDetails, bearerId) {
  const { name, productId, waist, length, sleaves } = productDetails;

  console.log(productDetails);

  try {
    const response = await fetch(
      `${base_url}/create_size`,

      {
        body: JSON.stringify({
          name: name,
          waist: waist,
          length: length,
          sleaves: sleaves,
          productId: productId,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function deleteProduct(productId, bearerId) {
  try {
    const response = await fetch(
      `${base_url}/delete_product`,

      {
        body: JSON.stringify({
          productId: productId,
        }),
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function deleteColor(productId, bearerId) {
  try {
    const response = await fetch(
      `${base_url}/delete_color`,

      {
        body: JSON.stringify({
          productColorId: productId,
        }),
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function createProductColor(productDetails, bearerId) {
  const { name, productImage, price, discount, salesPrice, sizeId, colorId } =
    productDetails;

  console.log(productDetails);
  try {
    const response = await fetch(`${base_url}/create_cloth_color`, {
      body: JSON.stringify({
        name: name,
        price: price,
        discount: discount,
        colorId: colorId,
        sizeId: sizeId,
        sales_price: salesPrice,
        image_url: productImage,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerId}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function uploadToCloudinary(file) {
  try {
    const upload = await fetch(
      "https://api.cloudinary.com/v1_1/dynkejvim/image/upload",
      {
        body: file,
        method: "POST",
      }
    );
    const response = await upload.json();
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function signupAdmin(user) {
  try {
    const response = await axios.post(
      `${base_url}/create_admin`,

      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function loginAdmin(user) {
  try {
    const response = await axios.post(
      `${base_url}/login_admin`,

      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export function getCookie() {
  const token = Cookies.get("_stewart_collection_token");
  if (token) {
    return token;
  }
}

export async function getUserDistance(address) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Replace with your OpenCage API key
  // const encodedAddress = encodeURIComponent(address);
  const geocodingEndpoint = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`;

  try {
    const response = await fetch(geocodingEndpoint);
    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry;
      return location;
    } else {
      console.log("No results found for the address.");
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Function to calculate the distance between two points using the Haversine formula
export function calculateDistance(
  userLat,
  userLng,
  destinationLat,
  destinationLng
) {
  const earthRadius = 6371; // Earth's radius in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1 = (userLat * Math.PI) / 180;
  const lon1 = (userLng * Math.PI) / 180;
  const lat2 = (destinationLat * Math.PI) / 180;
  const lon2 = (destinationLng * Math.PI) / 180;

  // Haversine formula
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = earthRadius * c; // Distance in kilometers

  return distance;
}

export async function getAllCountry() {
  var headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "OUJtTHBMdTBaSzQySmhoYWlaYThXMkZLU1djTURvU2Z4VHFTUlkxNw=="
  );

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const response = await fetch(
    "https://api.countrystatecity.in/v1/countries",
    requestOptions
  );
  const data = await response.json();

  return data;
}
export async function getAllCountryState(state) {
  var headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "OUJtTHBMdTBaSzQySmhoYWlaYThXMkZLU1djTURvU2Z4VHFTUlkxNw=="
  );

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${state}/states`,
    requestOptions
  );

  const data = response.json();
  return data;
}

export async function getSTateCities(country, state) {
  var headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "OUJtTHBMdTBaSzQySmhoYWlaYThXMkZLU1djTURvU2Z4VHFTUlkxNw=="
  );

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
    requestOptions
  );
  const cities = await response.json();

  return cities;
}

export async function createOrder(orderDetails) {
  const {
    email,
    total,
    orderitem,
    name,
    state,
    city,
    address,
    status,
    country,
    shipping,
    phone,
    shippingType,
    refNo,
  } = orderDetails;

  try {
    const response = await fetch(`${base_url}/create_order_vistor`, {
      method: "POST",
      body: JSON.stringify({
        email,
        total,
        orderitem,
        name,
        state,
        city,
        address,
        status,
        country,
        shipping,
        phone,
        shippingType,
        refNo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
export async function createRgisteredUserOrder(orderDetails, bearerId) {
  const {
    email,
    total,
    orderitem,
    name,
    state,
    city,
    address,
    status,
    country,
    shipping,
    phone,
    shippingType,
    refNo,
  } = orderDetails;

  try {
    const response = await fetch(`${base_url}/create_order_user`, {
      method: "POST",
      body: JSON.stringify({
        email,
        total,
        orderitem,
        name,
        state,
        city,
        address,
        status,
        country,
        shipping,
        phone,
        shippingType,
        refNo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerId}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
export async function createPayWithWallet(orderDetails, bearerId) {
  const {
    email,
    total,
    orderitem,
    name,
    state,
    city,
    address,
    status,
    country,
    shipping,
    phone,
    shippingType,
    refNo,
  } = orderDetails;

  try {
    const response = await fetch(`${base_url}/pay_with_wallet`, {
      method: "POST",
      body: JSON.stringify({
        email,
        total,
        orderitem,
        name,
        state,
        city,
        address,
        status,
        country,
        shipping,
        phone,
        shippingType,
        refNo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerId}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
export async function getCurrentUser(bearerId) {
  try {
    const response = await fetch(`${base_url}/get_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerId}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
export async function userSignup(details) {
  const { email, name, gender, dob, password } = details;

  try {
    const response = await fetch(`${base_url}/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        gender,
        dob,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
export async function loginUser(details) {
  const { email, password } = details;

  try {
    const response = await fetch(`${base_url}/login_user`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
export async function verifyOtp(details) {
  const { otp } = details;

  try {
    const response = await fetch(`${base_url}/verify_otp`, {
      method: "POST",
      body: JSON.stringify({
        otp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
export async function reqOtp(details) {
  const { email } = details;

  try {
    const response = await fetch(`${base_url}/request_otp`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
export async function resetPassword(details) {
  const { email, password } = details;

  try {
    const response = await fetch(`${base_url}/reset_password`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
export async function fundWallet(details, bearerId) {
  const { email, amount, name } = details;

  try {
    const response = await fetch(`${base_url}/fund_wallet`, {
      method: "POST",
      body: JSON.stringify({
        email,
        amount,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerId}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function payOrderWithWalet(orderDetails, token) {
  const {
    email,
    total,
    orderitem,
    name,
    state,
    city,
    address,
    status,
    country,
    shipping,
    phone,
    shippingType,
  } = orderDetails;

  try {
    const response = await fetch(`${base_url}/pay_with_wallet`, {
      method: "POST",
      body: JSON.stringify({
        email,
        total,
        orderitem,
        name,
        state,
        city,
        address,
        status,
        country,
        shipping,
        phone,
        shippingType,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
export async function payWithCardRegisteredUser(orderDetails, token) {
  const {
    email,
    total,
    orderitem,
    name,
    state,
    city,
    address,
    status,
    country,
    shipping,
    phone,
    shippingType,
    refNo,
  } = orderDetails;

  try {
    const response = await fetch(`${base_url}/create_order_user`, {
      method: "POST",
      body: JSON.stringify({
        email,
        total,
        orderitem,
        name,
        state,
        city,
        address,
        status,
        country,
        shipping,
        phone,
        shippingType,
        refNo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSavedItem(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/get_saved_items`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function deleteSavedItem(id, bearerId) {
  try {
    const response = await fetch(
      `${base_url}/delete_saved_item?id=${id}`,

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function saveItem(details, bearerId) {
  const { name, image, amount, id, status } = details;
  try {
    const response = await fetch(
      `${base_url}/save_item`,

      {
        body: JSON.stringify({
          name,
          image,
          amount,
          id,
          status,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function addReview(details, bearerId) {
  const { rating, name, comment, productId } = details;
 
  try {
    const response = await fetch(
      `${base_url}/add_review`,

      {
        body: JSON.stringify({
          rating,
          name,
          comment,
          productId,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function updateReview(details, bearerId) {
  const { rating, comment, id } = details;

  console.log(details)

  try {
    const response = await fetch(
      `${base_url}/update_review`,

      {
        body: JSON.stringify({
          rating,
          comment,
          id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getReviews(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/get_reviews`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function deleteReviews(id, bearerId) {

  
  try {
    const response = await fetch(
      `${base_url}/delete_review`,

      {
        body: JSON.stringify({
          id,
        }),
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getOrder(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/get_user_order`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getMessages(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/get_messages`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function deleteMessages(id, bearerId) {
  try {
    const response = await fetch(
      `${base_url}/delete_messages?id=${id}`,

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function updateProfile(details, bearerId) {
  const { email, name, phone, country, state, city, address } = details;
  try {
    const response = await fetch(
      `${base_url}/update_user_profile`,

      {
        body: JSON.stringify({
          email,
          name,
          phone,
          country,
          state,
          city,
          address,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export function pagination(totalItems) {
  const data = Array.from(
    { length: Math.ceil(totalItems.length / 6) },
    (_, index) => totalItems.slice(index * 6, (index + 1) * 6)
  );
  return data;
}
