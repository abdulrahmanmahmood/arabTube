"use client";
import React, { useState } from "react";
import axios from "axios";
import logo from "../../public/Group 1.png";
import Image from "next/image";
import { RxPerson } from "react-icons/rx";
import Link from "next/link";
import loginImage from "../../public/login/Illustrationlog in image.png";
import corner from "../../public/corner.png";
import Orlogin from "../components/Orlogin";
import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next"; // Import cookies-next library

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior

    try {
      const response = await axios.post(
        "https://arabtubedemo1.runasp.net/api/Account/Login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);

      // Check if the user is authenticated
      if (response.data.isAuthenticated) {
        // Save data in cookies
        setCookie("token", response.data.token, { maxAge: 60 * 60 * 24 * 7 });
        setCookie("email", response.data.email, { maxAge: 60 * 60 * 24 * 7 });
        setCookie("roles", JSON.stringify(response.data.roles), {
          maxAge: 60 * 60 * 24 * 7,
        });

        // Redirect to the home page or any authenticated page
        router.push("/");
      } else {
        // If not authenticated, prompt to verify email
        alert("Please verify your email before logging in.");
        router.push("/verfiy/otp");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#11112E] flex flex-row justify-between overflow-y-hidden">
      <Image
        src={corner}
        alt="corner"
        width={70}
        height={70}
        className="absolute right-0 top-0"
      />
      <div className="flex flex-col w-[50%] text-center">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="mt-20 mx-auto"
        />{" "}
        <h2 className="mt-5 text-3xl font-bold">Welcome Back</h2>
        <span className="mt-4">Sign in to access your account</span>
        <form className="w-[90%] mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <div className="flex flex-row border border-3 rounded-full border-white w-[60%] mx-auto my-6">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline w-[13%]">
                <RxPerson className="" />
              </div>
            </div>
            <div className="flex flex-row border border-3 rounded-full border-white w-[60%] mx-auto mt-6">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="py-2 px-2 pl-4 bg-[#11112E] w-[87%] rounded-l-full"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="bg-[#FF0000] p-3 rounded-r-3xl my-auto items-baseline w-[13%]">
                <RxPerson className="" />
              </div>
            </div>
            <p className="text-xs my-6 pr-[20%] text-right text-[#FF0000]">
              Forget password
            </p>
          </div>
          <button
            className="my-3 px-5 py-1 w-[300px] h-[50px] bg-[#FF0000] rounded-full"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <Orlogin />
      </div>
      <div className="w-[40%] border-2 border-white border-opacity-15 h-[80vh] my-auto mr-[40px] rounded-lg text-center">
        <div className="flex flex-col">
          <Image
            src={loginImage}
            alt="logo"
            width={300}
            height={300}
            className="mt-[20%] mx-auto"
          />{" "}
          <h1 className="text-3xl my-3">Welcome to Arab tube.</h1>
          <p className="w-[90%] mx-auto font-extralight ">
            Welcome to our new app! Discover a new world of exciting and
            inspiring videos. Enjoy browsing diverse content that suits all your
            interests
          </p>
        </div>
      </div>

      <Image
        src={corner}
        alt="corner"
        width={70}
        height={70}
        className="fixed -left-4 -bottom-12 rotate-180"
      />
    </div>
  );
};

export default Page;
