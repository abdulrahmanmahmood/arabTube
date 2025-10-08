"use client";
import React, { useEffect, useState } from "react";
import VideoComponent, { Video } from "./Video";
import axios from "axios";

const AllVideos = () => {
  const [allVideos, setAllVideos] = useState<Video[]>([]);

  const getAllVideos = async () => {
    try {
      const response = await axios.get(
        `https://arabtubedemo1.runasp.net/api/Videos/Videos`
      );
      console.log("Successfully fetched all videos", response.data);
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
      {allVideos.slice(0, 8).map((vid) => (
        <VideoComponent key={vid.id} vid={vid} />
      ))}
    </div>
  );
};

export default AllVideos;
