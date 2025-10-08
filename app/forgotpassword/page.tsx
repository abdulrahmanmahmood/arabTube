"use client";
import React, { useState } from "react";
import logo from "../../public/Group 1.png";
import Image from "next/image";
import { RxPerson } from "react-icons/rx";
import Link from "next/link";
import OTPImage from "../../public/otp/undraw_confirmed_81ex-(1)OTP1.png";
import corner from "../../public/corner.png";
import Orlogin from "../components/Orlogin";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
const page = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevents default form submission behavior
  };
  return (
    <div className="w-full h-full min-h-screen bg-[#11112E] flex flex-row justify-between overflow-y-hidden">
      <div className="mx-auto text-center items-center my-auto flex flex-col lg:min-w-[40%]">
        <div className="my-[50px]">
          <h2 className="my-5 text-3xl font-bold text-[#FF0000] ">
            Forgot your password?
          </h2>
          <span className="mt-4 ">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </span>
        </div>
        <form className="w-[90%] mx-auto " onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <div className="flex flex-row    border border-3 rounded-full  border-white w-[60%] mx-auto my-6">
              <input
                type="text"
                name="name"
                id="name"
                placeholder={"Enter your email"}
                className=" py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
              />
              <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline  w-[13%]">
                <AiOutlineMail />
              </div>
            </div>
          </div>
          <button
            className="my-3 px-5 py-1 w-[300px] h-[50px] bg-[#FF0000] rounded-full"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
