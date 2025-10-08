"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import logo from "../../public/Group 1.png";
import Image from "next/image";
import { RxPerson } from "react-icons/rx";
import Link from "next/link";
import RegisterImage from "../../public/register/Group 1000003211.png";
import { useRouter } from "next/navigation";
import { BiHide, BiSolidShow } from "react-icons/bi";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Page: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior

    const { firstName, lastName, email, password } = formData;
    const userName = email.substring(0, email.indexOf("@"));

    const payload = {
      firstName,
      lastName,
      email,
      userName,
      password,
    };

    try {
      const response = await axios.post(
        "https://arabtubedemo1.runasp.net/api/Account/Register",
        payload,
        {
          // withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      console.log("code:", response.data.code);
      console.log("userId:", response.data.userId);
      // const [userId, validationCode] = response.data.split("+");

      // Save userId and validationCode in localStorage
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("validationCode", response.data.code);

      // Navigate to the OTP verification page
      router.push("/verify/otp");
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#11112E] flex flex-row">
      <div className="flex flex-col w-[50%] text-center">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="mt-20 mx-auto"
        />
        <h2 className="mt-5 text-3xl font-bold">Get Started</h2>
        <span className="mt-4">by creating a free account.</span>
        <form className="w-[90%] mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between w-[70%] mx-auto my-6"></div>
          <div className="flex flex-row border border-3 rounded-full border-white w-[60%] mx-auto">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className="py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
              value={formData.firstName}
              onChange={handleChange}
            />
            <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline w-[13%]">
              <RxPerson className="text-[23px] text-center" />
            </div>
          </div>

          <div className="flex flex-row border border-3 rounded-full border-white w-[60%] mx-auto my-5">
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className="py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
              value={formData.lastName}
              onChange={handleChange}
            />
            <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline w-[13%]">
              <RxPerson className="text-[23px] text-center" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row border border-3 rounded-full border-white w-[60%] mx-auto my-3">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline w-[13%]">
                <RxPerson className="text-[23px] text-center" />
              </div>
            </div>

            <div className="flex flex-row border border-3 rounded-full border-white w-[60%] mx-auto my-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline w-[13%] text-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiSolidShow /> : <BiHide />}
              </button>
            </div>

            <div className="flex flex-row border border-3 rounded-full border-white w-[60%] mx-auto my-3">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                className="py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline w-[13%] text-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiSolidShow /> : <BiHide />}
              </button>
            </div>
          </div>
          <button
            className="my-3 px-5 py-1 w-[300px] h-[50px] bg-[#FF0000] rounded-full"
            type="submit"
          >
            Next
          </button>
        </form>
        <p className="mt-2 mb-10">
          Already a member?{" "}
          <Link href={"#"} className="text-[#FF0000] mx-1">
            Login
          </Link>
        </p>
      </div>
      <div className="w-[50%]">
        <Image
          src={RegisterImage}
          alt="register image"
          width={800}
          height={800}
          className="mt-[17%] mx-auto"
        />
      </div>
    </div>
  );
};

export default Page;
