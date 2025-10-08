import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AllVideos from "../components/AllVideos";
import Channels from "./_components/Channels";
import axios from "axios";

export interface User {
  channelTitle: string;
  username: string;
  userId: string;
  numOfVidoes: number;
  numOfSubscripers: number;
  profilePic: string;
}

const page = () => {
  return (
    <div className="bg-[#11112E] w-[100%] min-h-[100vh]  ">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row w-full mt-[145px]">
          <Sidebar />
          <div className="h-full overflow-hidden w-[80%] mx-auto ">
            <Channels />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
