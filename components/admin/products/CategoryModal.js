import { createCategory, getCookie } from "@/services/request";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillCloseSquare } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import Spinner from "@/components/spinner/Spinner";

export default function CategoryModal({ handleCloseCategoryModal }) {
      const [image, setImage] = useState({
        imageInput: "",
        imageFile:"",
        name:"",
        loading:false
    });
    const isDark = useSelector((state) => state.store.toggleMode.isDark);
    const router = useRouter();
  function handleImageInput(e) {

    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setImage({ ...image, imageInput: imageURL, imageFile: selectedImage });
    }
  }

  function handleResetImage(){
    setImage({ ...image, imageInput:"/triangledark.png", imageFile:""})
  }

  function handleTile(e){
    
const { name, value } = e.target;

setImage({ ...image, [name]: value });

  }

 async function handleSubmit(e){
   e.preventDefault()
   const cookie = getCookie();
  if( !Boolean(image.imageFile ) || !Boolean(image.name)){
    toast.error("Add product image and title");
    return 
  }
    setImage({ ...image, loading: true});
    const response  = await createCategory(image.imageFile, image.name, cookie)
    if (response.status === 200) {
      toast.success("Category created successfully")
        setImage({ ...image, loading: false, imageFile:"", name:"", imageInput:"" });
      }else{
        toast.error("Error occurred while creating category")
        setImage({ ...image, loading: false });
    }


  }

  

  return (
    <>
      <dialog id="my_modal_2" className="modal modal-open">
        <form
          onSubmit={handleSubmit}
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
              <h2 className=" col-span-2">Add Category</h2>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-1">
              <div className=" mt-4   ">
                <input
                  type="text"
                  placeholder="Enter category title"
                  name="name"
                  onChange={handleTile}
                  value={image.name}
                  className={`input input-bordered  w-full ${
                    isDark
                      ? " bg-black border-white "
                      : " text-black  border-black"
                  }`}
                />
              </div>

              <div className="  p-3 grid grid-cols-2  sm:grid-cols-1">
                <div className=" h-[250px] max-w-[250px]  my-auto">
                  <img
                    src={
                      image.imageInput ? image.imageInput : "/triangledark.png"
                    }
                    className="w-full h-full bg-[#d1d1d1] rounded-lg p-3"
                  />
                </div>
                <div className=" flex items-center  flex-col gap-4   justify-center">
                  <div className="  flex items-center gap-1 hover:underline hover:cursor-pointer relative ">
                    <input
                      id="imageupload"
                      onChange={handleImageInput}
                      type="file"
                      accept="image/*"
                      className=" absolute left-[-999px] "
                    />

                    <label
                      htmlFor="imageupload"
                      className="flex items-center gap-2 cursor-pointer">
                      {" "}
                      <MdModeEdit />
                      Add image
                    </label>
                  </div>
                  <div className="flex items-center gap-1  hover:cursor-pointer  hover:text-[#d73300]">
                    <AiFillCloseSquare className=" text-xl hover:cursor-pointer" />
                    <span
                      className=" text-[#D73300] hover:underline "
                      onClick={handleResetImage}>
                      Remove image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex justify-center  mb-8">
            <button
              className={`btn  shadow-md   capitalize sm:btn-xs sm:my-4 sm:text-[7.98px]  ${
                isDark
                  ? "hover:border-white hover:bg-black hover:text-white"
                  : " bg-black text-white hover:border-black"
              }`}>

              {image.loading && "Adding"}
              {image.loading && <Spinner/>}
              {!image.loading &&  "Add Category"}
              
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
