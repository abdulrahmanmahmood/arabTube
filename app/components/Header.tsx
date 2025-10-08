import Image from "next/image";
import React from "react";
import verctor from "../../public/Vector.jpg";
import logo from "../../public/Group 1.png";
import searchIcon from "../../public/searchIcon.png";
import mice from "../../public/mice.png";
import avatar from "../../public/avatar.png";
import notBell from "../../public/GroupnotBell.png";
import cinemaIcon from "../../public/CinemaIcon.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed top-0 w-full bg-[#11112E]">
      <div className="flex flex-row w-full justify-between  px-[5%]  lg:h-[66px] my-5 lg:my-10 ">
        <Link href={"/"}>
          <div className="w-[20%]  flex flex-row ">
            <Image
              src={logo}
              alt="logo"
              width={45}
              height={40}
              className="my-auto ml-2"
            />
            <p className="my-auto text-nowrap ml-5 md:ml-10 text-[#FF0000]">Arab Tube</p>
          </div>{" "}
        </Link>
        <div className="mx-auto my-auto w-[40%] hidden   md:flex flex-row justify-between ">
          <div className="border-white border-[1.5px]  rounded-xl w-[90%] pb-[.4px] overflow-hidden">
            <input
              type="text"
              className="bg-[#11112E] text-white  w-[87%] pl-3 h-full rounded-l-xl "
              placeholder="Search"
            />
            <button className="bg-[#FF0000] p-3  my-auto items-baseline h-full w-[13%]">
              <Image
                src={searchIcon}
                alt="search Icon"
                height={13}
                width={13}
                className="mx-auto"
              />
            </button>
          </div>
          <button className="bg-[#FF0000] my-auto h-7 w-7 rounded-full">
            <Image
              src={mice}
              alt="search Icon"
              height={19}
              width={16}
              className="mx-auto my-auto p-1"
            />
          </button>
        </div>
        <div className="flex flex-row justify-between  lg:w-[20%] max-md:h-[50px]  ">
          <div className="bg-white w-10 h-10 rounded-full my-auto">
            <Image
              src={cinemaIcon}
              alt="notBell"
              width={26}
              height={26}
              className="mx-auto my-auto py-2"
            />
          </div>
          <div className="bg-white w-10 h-10 rounded-full my-auto">
            <Image
              src={notBell}
              alt="notBell"
              width={24}
              height={24}
              className="mx-auto my-auto py-2 max-md:w-[20px] max-md:h-[40px] "
            />
          </div>
          <div className=" w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full my-auto">
            <Image
              src={avatar}
              alt="logo"
              width={60}
              height={60}
              className="my-auto ml-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
