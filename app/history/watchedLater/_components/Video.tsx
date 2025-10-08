"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import channelImage from "../../../public/avatar.png";

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
  vid: Video;
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

const VideoComponent: React.FC<VideoProps> = ({ vid }) => {
  return (
    <div className="rounded my-3 ">
      <Link href={`${vid.id}`}>
        <Image
          src={`data:image/png;base64,${vid.thumbnail}`}
          alt={vid.title}
          width={100}
          height={100}
          className="w-full h-[250px] mb-2 mx-auto rounded-lg"
        />
      </Link>
      <div className="px-3 text-left">
        <div className="flex flex-row my-2 ">
          <Image
            alt="channel image"
            src={channelImage}
            width={50}
            height={50}
          />{" "}
          <h3 className="text-lg font-bold my-auto mx-2">{vid.title}</h3>
        </div>{" "}
        <div className="flex flex-row ml-[70px]">
          <p className="text-sm text-gray-500">{vid.channelTitle}</p>
          <FaCheckCircle className="my-auto mx-2 " />
        </div>
        <div className="flex flex-row gap-2 ml-[70px] mt-1">
          <p className="text-sm text-gray-500">{vid.views} views .</p>
          <p className="text-sm text-gray-500">
            Uploaded on: {new Date(vid.createdOn).toLocaleDateString()}
          </p>
        </div>
        {vid.watchedTime ? (
          <div className="ml-[70px] mt-1">
            <p className="text-sm text-gray-500">
              Watched on: {formatDate(vid.watchedTime)}
            </p>
          </div>
        ) : null}{" "}
      </div>
    </div>
  );
};

export default VideoComponent;
