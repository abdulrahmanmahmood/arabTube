"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  disLikes: number;
  createdOn: string;
  channelTitle: string;
}

interface VideoProps {
  vid: Video;
}

const VideoComponent: React.FC<VideoProps> = ({ vid }) => {
  return (
    <div className="flex flex-row my-3">
      <Link href={`${vid.id}`}>
        <Image
          src={`data:image/png;base64,${vid.thumbnail}`}
          alt={vid.title}
          width={100}
          height={100}
          className="w-[250px] h-[170px] mb-2 mx-auto rounded-xl"
        />
      </Link>
      <div className="p-3 text-left">
        <h3 className="text-l font-bold mb-2 ">{vid.title}</h3>
        <div className="flex flex-row text-[#606060] my-3 ">
          <p className="my-auto ">{vid.channelTitle} </p>
          <FaCheckCircle className="my-auto mx-2 " />
        </div>
        <p className="text-[#606060] my-3 ">
          {vid.views} Views&nbsp;&nbsp;&nbsp;&nbsp;
          {new Date(vid.createdOn).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default VideoComponent;
