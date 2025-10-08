import React from "react";
import Sidebar from "../components/Sidebar";
import HomeHeader from "../components/HomeHeader";
import AllVideos from "../components/AllVideos";
import History from "./_component/HIstory";

const page = () => {
  return (
    <div className="bg-[#11112E] w-[100%] min-h-[100vh]  ">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row w-full mt-[145px]">
          <Sidebar />
          <div className="h-full overflow-hidden w-[80%] mx-auto ">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
