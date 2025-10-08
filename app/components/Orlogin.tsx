import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const Orlogin = () => {
  return (
    <div className="text-center w-[45%] mx-auto my-5">
      <div className="flex flex-row items-baseline my-5">
        <div className=" h-[1px]  w-[180px] bg-[#FF0000] my-auto" />
        <p className="items-baseline my-auto mx-2"> or</p>
        <div className=" h-[1px]  w-[180px] bg-[#FF0000] my-auto" />
      </div>
      <div className="flex flex-row justify-between items-center mx-auto">
        <div className="w-[70px] h-[70px] rounded-full border border-1 border-[#55ACEE]  py-5">
          <FaFacebookF className="text-[#55ACEE] mx-auto my-auto text-center text-2xl" />
        </div>{" "}
        <div className="w-[70px] h-[70px] rounded-full border border-1 border-[#55ACEE] py-5">
          <FaTwitter className="text-[#55ACEE] mx-auto my-auto text-center text-2xl" />
        </div>
        <div className="w-[70px] h-[70px] rounded-full border border-1 border-[#FF0000] py-5">
          <AiOutlineGoogle className="text-[#FF0000] mx-auto my-auto text-center text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Orlogin;
