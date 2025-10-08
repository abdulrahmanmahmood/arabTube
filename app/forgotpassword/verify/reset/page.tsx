import React from "react";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
const page = () => {
  return (
    <div className="w-full h-full min-h-screen bg-[#11112E] flex flex-row justify-between overflow-y-hidden">
      <div className="w-[60%] mx-auto my-auto text-center">
        <h1 className=" text-[#FF0000] text-3xl font-extrabold ">
          Reset password
        </h1>
        <p className="opacity-[75%] my-3">
          Please type something you’ll remember
        </p>
        <form action="submit" className=" text-center mt-[40px]">
          <label
            htmlFor="pass1"
            className="block text-left ml-[25%] text-sm my-4"
          >
            New password
          </label>
          <div className="flex flex-row    border border-3 rounded-full  border-white w-[50%] mx-auto my-3">
            <input
              type="text"
              name="pass1"
              id="pass1"
              placeholder="must be 8 characters"
              className=" py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
            />
            <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline  w-[13%] text-center">
              <BiHide className="text-2xl" />
            </div>
          </div>
          <div>
            <label
              htmlFor="pass2"
              className="block text-left ml-[25%] text-sm my-4"
            >
              Confirm new password
            </label>

            <div className="flex flex-row    border border-3 rounded-full  border-white w-[50%] mx-auto my-3">
              <input
                type="text"
                name="pass2"
                id="pass2"
                placeholder="repeat password"
                className=" py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
              />
              <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline  w-[13%]">
                <BiHide className="text-2xl" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
