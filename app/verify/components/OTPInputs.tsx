"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const OTPInputs: React.FC = () => {
  const router = useRouter();
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const validationCode = localStorage.getItem("validationCode");

    console.log(
      "the userId and validationCode in otpPage is >",
      userId,
      validationCode
    );

    if (!userId || !validationCode) {
      // Redirect back to registration if these values are missing
      router.push("/register");
    }
  }, [router]);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    if (!isNaN(parseInt(value)) && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleContinueClick = async () => {
    const userCode = otpDigits.join("");
    console.log("Entered OTP Digits:", userCode);

    const userId = localStorage.getItem("userId");
    const validationCode = localStorage.getItem("validationCode");

    if (!userId || !validationCode) {
      console.error("Missing userId or validationCode");
      return;
    }

    try {
      const data = {
        userCode,
        validCode: validationCode,
        userId,
      };
      console.log("data to the request ",data);
      
      const response = await axios.post(
        "https://arabtubedemo1.runasp.net/api/Account/ConfirmEmail",
        { ...data },
        {
          // withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      // Handle success (e.g., show a success message or redirect the user)
      router.push("/verify/otp/success");
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleResendClick = async () => {
    // Logic for resending the OTP can be added here
    console.log("Resend OTP");
  };

  return (
    <div>
      <div className="grid grid-cols-6 w-[60%] mx-auto my-3">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            type="text"
            name={`digit-${index}`}
            id={`digit-${index}`}
            placeholder="-"
            className="border border-1 border-white text-center bg-[#11112E] w-[50px] h-[50px] rounded"
            maxLength={1}
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
      </div>
      <p className="text-center text-sm my-3" onClick={handleResendClick}>
        I don't receive the code!{" "}
        <span className="text-[#FF0000] cursor-pointer">Resend</span>
      </p>
      <button
        className="my-3 px-5 py-1 w-[300px] h-[50px] bg-[#FF0000] rounded-full"
        onClick={handleContinueClick}
      >
        Continue
      </button>
    </div>
  );
};

export default OTPInputs;
