import React from "react";
import logo from "../../../public/Group 1.png";
import Image from "next/image";
import OTPImage from "../../../public/otp/undraw_confirmed_81ex-(1)OTP1.png";
import { IoIosArrowBack } from "react-icons/io";
import OTPInputs from "../components/OTPInputs";


const Page = () => {

  return (
    <div className="w-full h-full min-h-screen bg-[#11112E] flex flex-row justify-between overflow-y-hidden">
      <div className="flex flex-col w-[50%] text-center">
        <div className="fixed top-10 left-10 bg-[#FF0000] w-[60px] h-[60px] rounded-full text-center py-3">
          <IoIosArrowBack className="mx-auto text-3xl" />
        </div>
        <div className="h-[65vh] my-auto">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="mt-20 mx-auto"
          />{" "}
          <h2 className="mt-5 text-3xl font-bold text-[#FF0000]">
            OTP Verification
          </h2>
          <p className="mt-4 w-[80%] mx-auto">
            Please enter the 6-digit code sent to your email{" "}
            <span className="text-[#FF0000]">contact.cashierc@gmail.com</span>{" "}
            for verification.
          </p>
          <p className="text-[#FF0000] text-center my-3">05:00</p>
          <OTPInputs />
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
