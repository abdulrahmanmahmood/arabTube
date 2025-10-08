"use client";
import Image from "next/image";
import React from "react";
import sideBar from "../../public/jam_menusideBar1.png";
import { AiOutlineHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import {
  MdOutlineCloudUpload,
  MdOutlineWatchLater,
  MdVideoLibrary,
} from "react-icons/md";
import { FaHistory, FaRegArrowAltCircleDown } from "react-icons/fa";
import { HiOutlineFire } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { CgData } from "react-icons/cg";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const Frame1 = [
    {
      name: "Home",
      icon: (
        <AiOutlineHome className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/",
    },
    {
      name: "Channels",
      icon: (
        <GoPeople className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/channels",
    },
    {
      name: "Upload",
      icon: (
        <MdOutlineCloudUpload className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/upload",
    },
  ];
  const Frame2 = [
    {
      name: "Library",
      icon: (
        <MdVideoLibrary className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/library",
    },
    {
      name: "History",
      icon: (
        <FaHistory className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/history",
    },
  ];
  const Frame3 = [
    {
      name: "Trending",
      icon: (
        <HiOutlineFire className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/trending",
    },
    {
      name: "Watch Later",
      icon: (
        <MdOutlineWatchLater className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/watchedLater",
    },
    {
      name: "Settings",
      icon: (
        <IoSettingsOutline className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/settings",
    },
    {
      name: "Dwonloads",
      icon: (
        <FaRegArrowAltCircleDown className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/downloads",
    },
    {
      name: "Live",
      icon: (
        <CgData className="text-xl md:text-2xl max-lg:text-center max-lg:mx-auto" />
      ),
      link: "/live",
    },
  ];
  const pathname = usePathname();

  return (
    <div className="w-[16%] h-full block ">
      <Image
        src={sideBar}
        width={80}
        height={80}
        alt="side bar home icon"
        className="mx-auto"
      />
      <div className="w-full">
        {Frame1.map((item, index) => (
          <Link href={item.link} key={index}>
            <div
              className={`w-[80%] mx-auto my-1 p-4 flex flex-row text-center rounded-xl text-red-700  hover:text-white hover:bg-[#ff0000]
              ${pathname == item.link ? "bg-[#ff0000] text-white" : ""}`}
            >
              {item.icon}
              <p className="hidden lg:block text-whtie text-center mx-auto text-white">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
        <div className="w-[90%] h-[1px] bg-[#FF0000] mx-auto my-4 " />
      </div>
      <div className="w-full">
        {Frame2.map((item, index) => (
          <Link href={item.link} key={index}>
            <div
              className={`w-[80%] mx-auto my-1 p-4 flex flex-row text-center rounded-xl text-red-700  hover:text-white hover:bg-[#ff0000]
              ${pathname == item.link ? "bg-[#ff0000] text-white" : ""}`}
            >
              {item.icon}
              <p className="hidden lg:block text-whtie text-center mx-auto text-white">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
        <div className="w-[90%] h-[1px] bg-[#FF0000] mx-auto my-4 " />
      </div>
      <div className="w-full">
        {Frame3.map((item, index) => (
          <Link href={item.link} key={index}>
            <div
              className={`w-[80%] mx-auto my-1 p-4 flex flex-row text-center rounded-xl text-red-700  hover:text-white hover:bg-[#ff0000]
              ${pathname == item.link ? "bg-[#ff0000] text-white" : ""}`}
            >
              {" "}
              {item.icon}
              <p className="hidden lg:block text-whtie text-center mx-auto text-white">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
        <div className="w-[90%] h-[1px] bg-[#FF0000] mx-auto my-4 " />
      </div>
    </div>
  );
};

export default Sidebar;
