"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import channelImage from "../../../public/avatar.png";
import { playLIst } from "./AllPlaylists";
import axios from "axios";
import VideoComponent from "@/app/components/Video";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  disLikes: number;
  channelTitle: string;
  createdOn: string;
  watchedTime?: string; // optional
}

interface VideoProps {
  playlist: playLIst;
}
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Playlist: React.FC<VideoProps> = ({ playlist }) => {
  const playListId = playlist?.id;

  const [allVideos, setAllVideos] = useState<Video[]>([]);

  const getAllVideos = async (id: string) => {
    try {
      const response = await axios.get(
        `https://arabtubedemo1.runasp.net/api/Playlists/Video?id=${id}`
      );
      console.log("Successfully fetched all videos", response.data);
      setAllVideos(response.data);
    } catch (error) {
      console.error("Error in fetching all videos", error);
    }
  };

  useEffect(() => {
    getAllVideos(playListId);
  }, [allVideos]);

  return (
    <div className="rounded my-3 ">
      <Link href={`${playlist?.id}`}></Link>
      <div className="px-3 text-center ">
        {allVideos.map((vid) => (
          <div>
            <h3 className="font-bold my-auto  text-2xl">{playlist?.title}</h3>

            <VideoComponent key={vid.id} vid={vid} />
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default Playlist;
