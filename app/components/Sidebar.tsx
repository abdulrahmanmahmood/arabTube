import Image from "next/image";
import React from "react";
import sideBar from "../../public/jam_menusideBar1.png";
import homeIcon from "../../public/sideBar/VectorhomeIcon.png";
import shortsImgae from "../../public/sideBar/Groupshorts.png";
import channelsImgae from "../../public/sideBar/Group 13channels.png";
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { MdOutlineWatchLater, MdVideoLibrary } from "react-icons/md";
import { FaHistory, FaRegArrowAltCircleDown } from "react-icons/fa";
import { HiOutlineFire } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { CgData } from "react-icons/cg";

const Sidebar = () => {
  const Frame1 = [
    {
      name: "Home",
      icon: <AiOutlineHome className="text-2xl" />,
    },
    {
      name: "Shorts",
      icon: <SiYoutubeshorts className="text-2xl" />,
    },
    {
      name: "Channels",
      icon: <GoPeople className="text-2xl" />,
    },
  ];
  const Frame2 = [
    {
      name: "Library",
      icon: <MdVideoLibrary className="text-2xl " />,
    },
    {
      name: "History",
      icon: <FaHistory className="text-2xl " />,
    },
  ];
  const Frame3 = [
    {
      name: "Trending",
      icon: <HiOutlineFire className="text-2xl " />,
    },
    {
      name: "Watch Later",
      icon: <MdOutlineWatchLater className="text-2xl " />,
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline className="text-2xl " />,
    },
    {
      name: "Dwonloads",
      icon: <FaRegArrowAltCircleDown className="text-2xl " />,
    },
    {
      name: "Live",
      icon: <CgData className="text-2xl " />,
    },
  ];
  return (
    <div className="w-[16%] h-full ">
      <Image
        src={sideBar}
        width={80}
        height={80}
        alt="side bar home icon"
        className="mx-auto"
      />
      <div className="w-full">
        {Frame1.map((item, index) => (
          <div className="w-[80%] mx-auto my-1 p-4 flex flex-row text-center rounded-xl text-red-700  hover:text-white hover:bg-[#ff0000]">
            {item.icon}
            <p className="text-whtie text-center mx-auto text-white">
              {item.name}
            </p>
          </div>
        ))}
        <div className="w-[90%] h-[1px] bg-[#FF0000] mx-auto my-4 " />
      </div>
      <div className="w-full">
        {Frame2.map((item, index) => (
          <div className="w-[80%] mx-auto my-1 p-4 flex flex-row text-center rounded-xl text-red-700  hover:text-white hover:bg-[#ff0000]">
            {item.icon}
            <p className="text-whtie text-center mx-auto text-white">
              {item.name}
            </p>
          </div>
        ))}
        <div className="w-[90%] h-[1px] bg-[#FF0000] mx-auto my-4 " />
      </div>
      <div className="w-full">
        {Frame3.map((item, index) => (
          <div className="w-[80%] mx-auto my-1 p-4 flex flex-row text-center rounded-xl text-red-700 hover:text-white hover:bg-[#ff0000] ">
            {item.icon}
            <p className="text-whtie text-center mx-auto text-white">
              {item.name}
            </p>
          </div>
        ))}
        <div className="w-[90%] h-[1px] bg-[#FF0000] mx-auto my-4 " />
      </div>
    </div>
  );
};

export default Sidebar;
