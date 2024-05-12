import Image from "next/image";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeHeader from "./components/HomeHeader";

export default function Home() {
  return (
    <div className="bg-[#11112E] w-[100%] min-h-[100vh]  ">
      <div className="flex flex-col items-center justify-center">
        <Header />

        <div className="flex flex-row w-full">
          <Sidebar />
          <div className="h-full overflow-hidden w-[80%]">
            <HomeHeader/>
          </div>
        </div>
      </div>
    </div>
  );
}
