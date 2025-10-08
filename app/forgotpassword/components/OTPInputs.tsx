// OTPInputs.js
import React, { useState, useRef } from "react";

const OTPInputs = () => {
  const [otpDigits, setOtpDigits] = useState<string[]>([]);
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement | null>(null)
  );

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

  const handleContinueClick = () => {
    console.log("Entered OTP Digits:", otpDigits.join(""));
    // Call the onContinue callback function passed from the parent component
  };

  return (
    <div>
      <div className="grid grid-cols-6  mx-auto my-3">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            type="text"
            name={`digit-${index}`}
            id={`digit-${index}`}
            placeholder="-"
            className="border border-1 border-white text-center bg-[#11112E] w-[50px] h-[50px] rounded"
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
      </div>
      <p className="text-center text-sm my-3">
        I don't receive the code! <span className="text-[#FF0000]">Resend</span>
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
