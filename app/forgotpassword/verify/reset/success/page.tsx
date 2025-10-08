import Image from "next/image";
import React from "react";
import successImage from "../../../../../public/forgot password illustrationsuccess.png";

const page = () => {
  return (
    <div className="w-full h-full min-h-screen bg-[#11112E]  justify-between overflow-y-hidden">
      <div className="w-[80%] mx-auto mt-[150px]  flex flex-col-reverse lg:flex-row justify-between">
        <div
          className="w-full lg:w-[40%] my-auto text-center
        "
        >
          <h1 className="text-[#FF0000] text-3xl font-extrabold my-6">
            Password changed
          </h1>
          <p className="text-center w-[80%] mx-auto my-3">
            Your password has been changed succesfully
          </p>
          <button
            className="my-3 px-5 py-1 w-[300px] h-[50px] bg-[#FF0000] rounded-full"
            type="submit"
          >
            Back To Login
          </button>
        </div>
        <Image
          src={successImage}
          alt="success"
          width={150}
          height={150}
          className="w-[300px] h-[300px] my-auto max-md:mx-auto max-md:gap-3"
        />
      </div>
    </div>
  );
};

export default page;
