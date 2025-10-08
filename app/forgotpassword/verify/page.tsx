"use client";
import React from "react";
import logo from "../../../public/Group 1.png";
import Image from "next/image";
import OTPImage from "../../../public/otp/undraw_confirmed_81ex-(1)OTP1.png";
import { IoIosArrowBack } from "react-icons/io";
import OTPInputs from "../components/OTPInputs";

const Page = () => {
  const handleContinue = () => {
    // Your logic to handle continue button click
    console.log("Continue button clicked!");
  };
  return (
    <div className="w-full h-full min-h-screen bg-[#11112E] flex flex-row justify-between overflow-y-hidden">
      <div className="flex flex-col mx-auto  text-center ">
        <div className="h-[65vh] my-auto mx-auto">
          <h2 className="mt-5 text-3xl font-bold text-[#FF0000]">
            Veri fy code
          </h2>
          <p className="mt-4 w-[80%] mx-auto">
            An authentication code has been sent to your email.
          </p>
          <OTPInputs />
        </div>
      </div>
    </div>
  );
};

export default Page;
