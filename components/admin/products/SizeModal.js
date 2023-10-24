import { createProductSize, getCookie } from "@/services/request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function SizeModal({ handleCloseCategoryModal, productId }) {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);
const [sizeDetails, setSizeDetails] = useState({
  name:"",
  productId:""
})
  const router = useRouter();
  useEffect(()=>{
setSizeDetails({ ...sizeDetails, productId: productId });
  }, [])
  function  handleSizeInput(e){
    const {name, value} = e.target
setSizeDetails({...sizeDetails, [name]:value})
  }
 async function handleSubmitCreateSize(e){
e.preventDefault()
const cookie = getCookie();
const response = await createProductSize(sizeDetails, cookie);
if(response.ok){
  toast.success("Product size created successfully")
}else{
  toast.error("Product size creation failed")
}

  }
  
  return (
    <>
      <dialog id="my_modal_2" className="modal modal-open">
        <form
          onSubmit={handleSubmitCreateSize}
          method="dialog"
          className=" modal-box bg-[#212121]  xl:max-w-5xl lg:max-w-2xl    sm:text-xs text-[white]">
          <div className="  mt-0    text-[16px]  font-semibold  p-10">
            <div className=" flex justify-end  ">
              <span
                className=" cursor-pointer "
                onClick={handleCloseCategoryModal}>
                close
              </span>
            </div>
            <div className="grid grid-cols-5  border-b-2 border-white py-4">
              <h2 className=" col-span-2">Add Product name</h2>
            </div>

            <div className=" mt-4   ">
              <input
                type="text"
                name="name"
                value={sizeDetails.name}
                onChange={handleSizeInput}
                placeholder="Enter product size e.g sm, m, lg, xl, 2xl 3xl"
                className={`input input-bordered  w-full ${
                  isDark
                    ? " bg-black border-white "
                    : " text-black  border-black"
                }`}
              />
            </div>
          </div>

          <div className=" flex justify-center  mb-8">
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>
              Add Size
            </button>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
