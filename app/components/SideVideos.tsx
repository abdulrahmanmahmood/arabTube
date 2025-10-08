"use client";
import React, { useEffect, useState } from "react";
import VideoComponent, { Video } from "./Sidevideo";
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
    <div className="flex flex-col mx-auto">
      {allVideos.map((vid) => (
        <VideoComponent key={vid.id} vid={vid} />
      ))}
    </div>
  );
};

export default AllVideos;
