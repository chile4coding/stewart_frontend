const { useSelector } = require("react-redux");


export default function ProfileUpdate() {
  const isDark = useSelector((state) => state.store.toggleMode.isDark);

  return (
    <div className={`mb-6 card ${isDark ? " bg-[#212121]" : " bg-[#d1d1d1]"}`}>
      <div className=" card-body">
        <h2 className={`mb-3  pb-1`}>Profile Details</h2>

        <div className="grid  grid-cols-2 gap-4 sm:grid-cols-1">
          <div className="">
            <label className={isDark ? "active_label" : ""}>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className={`input input-bordered w-full max-w-xs sm:max-w-full ${
                isDark
                  ? " bg-black border-white  "
                  : " text-black  border-black"
              }`}
            />
          </div>
          <div>
            <label className={isDark ? "active_label" : ""}>Last Name</label>
            <input
              type="text"
              placeholder="Surname"
              className={`input input-bordered  w-full max-w-xs sm:max-w-full ${
                isDark ? " bg-black border-white " : " text-black  border-black"
              }`}
            />
          </div>
        </div>
        <div className=" my-3">
          <label className={isDark ? "active_label" : ""}>Email</label>
          <input
            type="email"
            placeholder="example@example.com"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" my-3">
          <label className={isDark ? "active_label" : ""}>Phone</label>
          <input
            type="text"
            placeholder=" 081023445"
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Password</label>
          <input
            type="password"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Country</label>
          <input
            type="text"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>State</label>
          <input
            type="text"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>City</label>
          <input
            type="text"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>
        <div className=" mb-3">
          <label className={isDark ? "active_label" : ""}>Address</label>
          <input
            type="text"
            placeholder=""
            className={`input input-bordered w-full ${
              isDark ? " bg-black border-white  " : " text-black  border-black"
            }`}
          />
        </div>

        <div className="flex justify-evenly  gap-8">
          <button
            className={`  btn  shadow-md   capitalize sm:my-4  flex-1   ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            Change Password
          </button>
          <button
            className={`  btn  shadow-md   capitalize sm:my-4 flex-1   ${
              isDark
                ? "hover:border-white hover:bg-black hover:text-white"
                : " bg-black text-white hover:border-black "
            }`}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
