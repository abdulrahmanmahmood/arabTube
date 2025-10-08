"use client";
import React from "react";
import logo from "../../../../public/Group 1.png";
import Image from "next/image";
import OTPImage from "../../../../public/otp/undraw_confirmed_81ex-(1)OTP1.png";
import { IoIosArrowBack } from "react-icons/io";
import OTPInputs from "../../components/OTPInputs";
import Link from "next/link";

const Page = () => {
  const handleContinue = () => {
    // Your logic to handle continue button click
    console.log("Continue button clicked!");
  };
  return (
    <div className="w-full h-full min-h-screen bg-[#11112E] flex flex-row justify-between overflow-y-hidden">
      <div className="flex flex-col w-[50%] text-center">
        <div className="fixed top-10 left-10 bg-[#FF0000] w-[60px] h-[60px] rounded-full text-center py-3">
          <IoIosArrowBack className="mx-auto text-3xl" />
        </div>
        <div className=" my-auto">
          <h2 className="mt-5 text-3xl font-bold text-[#FF0000]">Success!</h2>
          <p className="mt-4 w-[80%] mx-auto text-xl font-bold">
            Congratulations! You have been successfully authenticated
          </p>
          <Link href={"/login"}>
            <button className="my-3 px-5 py-1 w-[300px] h-[50px] bg-[#FF0000] rounded-full">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <OTPImageSection />
    </div>
  );
};

const OTPImageSection = () => {
  return (
    <div className="w-[40%] h-[80vh] my-auto mr-[40px] rounded-lg text-center">
      <div className="flex flex-col">
        <Image
          src={OTPImage}
          alt="logo"
          width={500}
          height={500}
          className="mt-[20%] mx-auto"
        />{" "}
      </div>
    </div>
  );
};

export default Page;
