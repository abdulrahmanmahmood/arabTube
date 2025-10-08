"use client";
import React, { useEffect, useState } from "react";
import VideoComponent, { Video } from "../../components/Video";
import axios from "axios";
import { getCookie } from "cookies-next";

const AllVideos = () => {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const token = getCookie("token") as string;
  console.log("tooken is", token);

  const getAllVideos = async () => {
    try {
      const response = await axios.get(
        `https://arabtubedemo1.runasp.net/api/WatchedVideos`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Successfully fetched all History", response.data);
      setAllVideos(response.data);
    } catch (error) {
      console.error("Error in fetching all videos", error);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <div className="mx-auto grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1  gap-4 p-4">
      {allVideos.map((vid) => (
        <VideoComponent key={vid.id} vid={vid} />
      ))}
    </div>
  );
};

export default AllVideos;
