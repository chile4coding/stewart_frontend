import { NextResponse } from "next/server";


export default function middleware(req, res) {
  // console.log(req.cookies)
  const verify = req.cookies.get("_stewart_collection_token");


  const url = req.url;
  const checkUr =
    url.includes("/admin/home") ||
    url.includes("/admin/products") ||
    url.includes("/admin/orders") ||
    url.includes("/admin/reviews") ||
    url.includes("/admin/customers") ||
    url.includes("/admin/transactions") ||
    url.includes("/my_account") ||
    url.includes("/orders") ||
    url.includes("/messages") ||
    url.includes("/saved_items") ||
    url.includes("/reviews") ||
    url.includes("/admin/settings"); 
  if (!verify && checkUr) {
      return NextResponse.redirect(
        "https://stewart-frontend-chile4coding.vercel.app/login"
      );
  }
}
