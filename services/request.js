import { data } from "autoprefixer";
import axios from "axios";
import Cookies from "js-cookie";
// const base_url = "http://localhost:5000/api/v1";

const base_url = process.env.NEXT_PUBLIC_BACKEND_API;
import { io } from "socket.io-client";

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
export async function userImageUpload(avatar, bearerId) {
  try {
    const response = await fetch(`${base_url}/update_user_pics`, {
      body: JSON.stringify({
        avatar,
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

export async function productSingle(id) {
  try {
    const { data } = await axios.get(`${base_url}/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
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
export async function getShopProducts({
  search = "",
  count = 100,
  filter = "",
}) {
  try {
    const { data } = await axios.get(
      `${base_url}/get_products?limit=${count}&search=${search}&key=${filter}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
  const { email, password } = user;

  try {
    const response = await fetch(
      `${base_url}/login_admin`,

      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
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
  const geocodingEndpoint = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;
  try {
    const response = await fetch(geocodingEndpoint);
    const data = await response.json();

    if (data?.length > 0) {
      return data[0];
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
    throw error;
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

  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      requestOptions
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
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

  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${state}/states`,
      requestOptions
    );

    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
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
  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
      requestOptions
    );
    const cities = await response.json();

    return cities;
  } catch (error) {
    throw error;
  }
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

export async function createOrderWithCard(orderDetails) {
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
    token,
  } = orderDetails;
  const endpoint = token
    ? "create_order_user_with_card"
    : "create_order_visitor_with_card";

  try {
    const response = await fetch(`${base_url}/${endpoint}`, {
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
        token,
      }),
      headers: {
        "Content-Type": "application/json",

        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
      `${base_url}/delete_saved_item`,

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

export async function sendMessage(details, bearerId) {
  try {
    const response = await fetch(
      `${base_url}/create_message`,

      {
        body: JSON.stringify(details),
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
export async function getAdminGraph(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/admin_graph`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getCustomers(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/get_customers`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getVisitors(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/get_visitors`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerId,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function visitor() {
  try {
    const response = await fetch(
      `${base_url}/visitor`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getNotification(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/get_notification`,

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
export async function adminMessages(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/admin_get_message`,

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
      `${base_url}/messages`,

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
export function paginationProduct(totalItems) {
  const data = Array.from(
    { length: Math.ceil(totalItems.length / 6) },
    (_, index) => totalItems.slice(index * 6, (index + 1) * 6)
  );
  return data;
}

export async function adminGetOrders(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/admin_get_orders`,

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

export function paginationReview(totalItems) {
  const data = Array.from(
    { length: Math.ceil(totalItems.length / 4) },
    (_, index) => totalItems.slice(index * 4, (index + 1) * 4)
  );
  return data;
}
export async function adminGetreviews(bearerId) {
  try {
    const response = await fetch(
      `${base_url}/admin_get_reviews`,

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

export async function updateAdmin(admin, bearerId) {
  const { firstName, lastName, city, country, state, email, phone } = admin;

  try {
    const response = await fetch(`${base_url}/update_admin_profile`, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        name: city,
        country,
        state,

        email,
        phone,
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
export async function updateAdminPics(avatar, bearerId) {
  try {
    const response = await fetch(`${base_url}/update_admin_profile_pics`, {
      method: "POST",
      body: JSON.stringify({
        avatar,
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
export async function getAdmin(bearerId) {
  try {
    const response = await fetch(`${base_url}/get_admin`, {
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
export async function contactUs(contact) {
  try {
    const response = await fetch(`${base_url}/contact`, {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
export async function getUser() {
  const token = Cookies.get("_stewart_collection_token");
  try {
    const response = await fetch(`${base_url}/get_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (error) {
    throw error;
  }
}

export const socket = io("https://stewart-r0co.onrender.com");
export const isShippingAddressIncomplete = (address) => {
  const { shipping, countries, states, cities, ...requiredfield } = address;
  return Object.values(requiredfield).some((value) => value.trim() === "");
};
