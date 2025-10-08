"use client";
import React, { useEffect, useState } from "react";
import PlayLists, { Video } from "./playLIst";
import axios from "axios";
import { getCookie } from "cookies-next";

export interface playLIst {
  id: string;
  isPrivate: boolean;
  title: string;
}

const AllPlaylists = () => {
  const [allVideos, setAllVideos] = useState<playLIst[]>([]);
  const token = getCookie("token") as string;
  console.log("tooken is", token);

  const getAllVideos = async () => {
    try {
      const response = await axios.get(
        `https://arabtubedemo1.runasp.net/api/Playlists/MyPlaylist`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Successfully fetched all playLists", response.data);
      setAllVideos(response.data);
    } catch (error) {
      console.error("Error in fetching all Playlists", error);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, [allVideos]);

  return (
    <div className="mx-auto grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1  gap-4 p-4">
      {allVideos.map((vid) => (
        <PlayLists key={vid.id} playlist={vid} />
      ))}
    </div>
  );
};

export default AllPlaylists;
