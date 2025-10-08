import Image from "next/image";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AllPlaylists from "./_component/AllPlaylists";

export default function Home() {
  return (
    <div className="bg-[#11112E] w-[100%] min-h-[100vh]  ">
      <div className="flex flex-col items-center justify-center">
        <Header />
        <div className="flex flex-row w-full max-md:mt-[90px] mt-[145px]">
          <Sidebar />
          <div className="h-full overflow-hidden w-[80%] mx-auto ">
            <h1 className="text-center text-red-600 text-4xl font-bold ">
              All Your Playlists{" "}
            </h1>
            <AllPlaylists />
          </div>
        </div>
      </div>
    </div>
  );
}
