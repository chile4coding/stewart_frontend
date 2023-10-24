import axios from "axios";
import Cookies from "js-cookie";
// const base_url = "http://localhost:5000/api/v1";
const base_url = "https://stewart-r0co.onrender.com/api/v1";


export async function createCategory(productPhoto, category, bearerId) {
  try {
    const response = await axios.post(
      `${base_url}/create_category/${category}`,
      {
        image: productPhoto,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
  } = productDetails;

  try {
    const response = await axios.post(
      `${base_url}/create_product/${categoryId}/${name}/${price}/${salesPrice}/${discount}/${initialSize}/${initialColor}/${description}/${productId}`,
      {
        image: productImage,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
  const { name, productId } = productDetails;
  try {
    const response = await fetch(
      `${base_url}/create_size/${name}/${productId}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "Content-Type",
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
    const response = await axios.post(
      `${base_url}/create_cloth_color/${name}/${price}/${discount}/${sizeId}/${salesPrice}/${colorId}`,
      {
        image: productImage,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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



export function getCookie(){
  const token = Cookies.get("_stewart_collection_token");
  if(token){
    return token
  }
}