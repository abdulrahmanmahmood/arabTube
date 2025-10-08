import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import sideBar from "../../public/jam_menusideBar1.png";
import Video from "./_component/Video";
import SideVideos from "../components/SideVideos";

const page = () => {
  return (
    <div className="bg-[#11112E] w-[100%] min-h-[100vh]  ">
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="flex flex-col w-full mt-[140px]">
          <Image
            src={sideBar}
            width={100}
            height={100}
            alt="side bar home icon"
            className="ml-[5%]"
          />
        </div>
        <div className="flex lg:flex-row lg:px-[2%] flex-col justify-between w-[95%] mx-auto ">
          <div className="w-[100%] lg:w-[72%] ">
            <Video />
          </div>
          <div className=" w-[90%] lg:w-[25%] my-10 ">
            <SideVideos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
