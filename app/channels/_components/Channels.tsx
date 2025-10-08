"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import channelImage from "../../../public/avatar.png";
import av4 from "../../../public/av4.jpg";
import av3 from "../../../public/av3.jpeg";
import av5 from "../../../public/av5.jpeg";
import av6 from "../../../public/av6.png";
import av7 from "../../../public/av7.jpeg";
import av8 from "../../../public/av8.jpeg";
import axios from "axios";

interface User {
  channelTitle: string;
  username: string;
  userId: string;
  numOfVidoes: number;
  numOfSubscripers: number;
  profilePic: string;
}

const Channels = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store the fetched users
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage errors
  const [precomputedImages, setPrecomputedImages] = useState<string[]>([]); // State to store precomputed images

  const channelsImages = [channelImage, av3, av4, av5, av6, av7, av8];

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(
        "https://arabtubedemo1.runasp.net/api/Account/Users"
      );
      setUsers(response.data);
      setIsLoading(false);
      console.log("channels", response.data);
    } catch (error) {
      setError("Failed to fetch users");
      setIsLoading(false);
    }
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchUsers();
    const imageSrcs = channelsImages.map((img) => img.src);
    setPrecomputedImages(shuffleArray(imageSrcs));
  }, []);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">{error}</p>;

  return (
    <div className="w-[95%] lg:w-[80%] h-auto my-10">
      {users.map((user, index) => (
        <div key={user.userId} className="flex flex-row justify-between my-7">
          <div className="flex flex-row gap-5">
            <Image
              alt="channel image"
              src={
                user.profilePic ||
                precomputedImages[index % precomputedImages.length]
              }
              width={100}
              height={100}
              className="max-md:w-[50px] max-md:h-[50px] rounded-full"
            />
            <div className="my-auto">
              <h3 className="lg:text-xl">{user.channelTitle}</h3>
              <div className="flex flex-col lg:flex-row text-nowrap gap-1 lg:gap-9 lg:my-2">
                <p>
                  <span className="text-red-600">{user.numOfSubscripers} </span>{" "}
                  subscribers
                </p>
                <p>
                  <span className="text-red-600">{user.numOfVidoes} </span>{" "}
                  videos
                </p>
              </div>
            </div>
          </div>
          <button className="text-[#80869A] px-3 lg:px-10 py-1 lg:py-3 border border-1 border-[#80869A] rounded-3xl h-[40px] lg:h-[60px] my-auto">
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
};

export default Channels;
