"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { SlDislike } from "react-icons/sl";
import { PiShareFat } from "react-icons/pi";
import { RiPlayListAddFill } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { HiOutlineBellAlert, HiUserCircle } from "react-icons/hi2";
import { MdReportProblem } from "react-icons/md";
import Comments from "../_component/Comments";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";

// Updated Video Interface
interface Video {
  id: string;
  title: string;
  videoUriList: string[];
  channelTitle: string;
  description: string;
  flags: number;
  likes: number;
  disLikes: number;
  thumbnail: string;
  createdOn: string; // Change to string to match API response type
  updatedOn: string; // Change to string to match API response type
  userId: string;
  username: string;
  views: number;
}
export interface Comment {
  commentId: string;
  username: string;
  content: string;
  createdOn: string;
  isUpdated: boolean;
  mention: string;
  likes: number;
  disLike: number;
  childrens: Comment[];
}

const VideoComponent = () => {
  const [video, setVideo] = useState<Video | null>(null); // State for a single video
  const [comments, setComments] = useState<Comment[]>([]); // State for comments
  const token = getCookie("token") as string;
  console.log("tooken is", token);
  const params = useParams();

  // Function to get the video ID as a string
  const getVideoId = (
    videoParam: string | string[] | undefined
  ): string | undefined => {
    if (!videoParam) return undefined;
    return Array.isArray(videoParam) ? videoParam[0] : videoParam;
  };

  const videoId = getVideoId(params.video);

  useEffect(() => {
    if (videoId) {
      console.log("videoId", videoId);
      getVideo(videoId);
      getComments(videoId);
      addView(videoId);
    }
  }, [videoId]);

  const getVideo = async (videoId: string) => {
    try {
      const response = await axios.get<Video>(
        `https://arabtubedemo1.runasp.net/api/Videos/Video?id=${videoId}`
      );
      console.log("Successfully fetched the video", response.data);
      setVideo(response.data);
    } catch (error) {
      console.error("Error in fetching the video", error);
    }
  };
  const getComments = async (videoId: string) => {
    try {
      const response = await axios.get<Comment[]>(
        `https://arabtubedemo1.runasp.net/api/Comments/Comments?id=${videoId}`
      );
      console.log("Successfully fetched the comments", response.data);
      setComments(response.data);
    } catch (error) {
      console.error("Error in fetching the comments", error);
    }
  };
  const handleLike = async () => {
    if (videoId && token) {
      try {
        const response = await axios.post(
          `https://arabtubedemo1.runasp.net/api/Videos/like?Id=${videoId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        getVideo(videoId); // Refresh video data
        console.log("correct add like ", response);
      } catch (error) {
        console.error("Error liking the video", error);
      }
    }
  };

  const handleDislike = async () => {
    if (videoId && token) {
      try {
        const response = await axios.get(
          `https://arabtubedemo1.runasp.net/api/Videos/Dislike?videoId=${videoId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        getVideo(videoId); // Refresh video data
        console.log();
      } catch (error) {
        console.error("Error disliking the video", error);
      }
    }
  };

  const handleFlag = async () => {
    if (videoId && token) {
      try {
        const response = await axios.post(
          `https://arabtubedemo1.runasp.net/api/Videos/Flag?videoId=${videoId}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        getVideo(videoId); // Refresh video data
      } catch (error) {
        console.error("Error flagging the video", error);
      }
    }
  };

  const addView = async (videoId: string) => {
    if (token) {
      try {
        const response = await axios.post(
          `https://arabtubedemo1.runasp.net/api/Videos/View?id=${videoId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("added to history successfully", response.data);
      } catch (error) {
        console.error("Error adding video view", error);
      }
    }
  };

  return (
    <div className="w-full overflow-x-hidden ">
      {video ? (
        <div className="w-[100%] ">
          <video
            className="mb-5 w-[100%] h-[100%] max-h-[500px] object-contain"
            controls
            // autoPlayvideo_2024-06-25_08-35-55.mp4
            poster={`data:image/jpeg;base64,${video.thumbnail}`}
            src={`${
              videoId == "c4aa5050-53fc-4e03-9298-5dbb7e2c037d"
                ? "/videos/0625(1).mp4"
                : "/videos/govern.mp4"
            }`}
            // preload="auto"
          >
            {/* <source src="../../../videos/govern.mp4" type="video/mp4" /> */}
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
          <div className="flex flex-col-reverse lg:flex-row justify-between">
            <div className="flex flex-row justify-between w-full">
              <h3 className="text-xl my-8 ml-6">{video.title}</h3>
              <div className=" flex flex-row mx-auto max-md:w-[90%] lg:mx-6 text-red-600  my-auto ">
                {/* <p>Views: {video.views}</p> */}
                <div className="flex flex-row gap-1 mx-3 ">
                  <BiLike
                    className="text-red-600 text-2xl"
                    onClick={handleLike}
                  />
                  <p className="text-xl">{video.likes}</p>
                </div>
                <div className="flex flex-row gap-1 mx-3">
                  <SlDislike
                    className="text-red-600 text-2xl"
                    onClick={handleDislike}
                  />
                  <p>{video.disLikes}</p>
                </div>
                <div className="flex flex-row gap-1 mx-3">
                  <PiShareFat className="text-red-600 text-2xl" />
                  <p>Share</p>
                </div>
                <div className="flex flex-row gap-1 mx-3">
                  <RiPlayListAddFill className="text-red-600 text-2xl" />
                  <p>Save</p>
                </div>
                <div className="flex flex-row gap-1 mx-3" onClick={handleFlag}>
                  <MdReportProblem className="text-red-600 text-2xl" />
                  <p>Flag</p>
                </div>
                <IoIosMore className="text-2xl" />
                {/* <p>Flags: {video.flags}</p> */}
              </div>
            </div>
          </div>

          <div className="video-details ml-5 flex flex-col-reverse lg:flex-row items-center justify-between w-[100%]">
            <div className="flex flex-row w-[100%] my-5 gap-5 ">
              <div className="flex flex-row gap-2">
                <Image
                  src={`data:image/png;base64,${video.thumbnail}`}
                  alt="thumnail"
                  width={10}
                  height={10}
                  className="w-[50px] h-[50px] rounded-2xl mx-5"
                />
                <p className="my-auto text-red-600 text-nowrap">
                  {video.channelTitle}
                </p>
              </div>
              <button className="p-3 mx-3 bg-[#FF0000] rounded-2xl text-white">
                Subscribe
              </button>
              <HiOutlineBellAlert className="text-red-600 text-4xl my-auto" />
            </div>{" "}
          </div>

          <div className="ml-5 mt-5 ">
            {comments.length > 0 ? (
              <h3 className="my-8 ml-5">{comments.length} &nbsp; Comments</h3>
            ) : null}
            <div className="flex flex-row">
              <HiUserCircle className="text-6xl" />

              <input
                type="text"
                placeholder="Add a comment..."
                className="bg-[#11112E] mx-3 w-full px-5 border border-1 "
              />
            </div>

            <Comments comments={comments} />
          </div>
        </div>
      ) : (
        <div className="w-[100%] ">
          <div className="bg-black w-[100%] h-[40vh] lg:h-[70vh]" />
          <div className="flex flex-col-reverse lg:flex-row justify-between">
            <div className="flex flex-row justify-between w-full">
              <h3 className="text-xl my-8 ml-6">...</h3>
              <div className=" flex flex-row mx-auto max-md:w-[90%] lg:mx-6 text-red-600  my-auto ">
                {/* <p>Views: {video.views}</p> */}
                <div className="flex flex-row gap-1 mx-3 ">
                  <BiLike className="text-red-600 text-2xl" />
                  <p className="text-xl">..K</p>
                </div>
                <div className="flex flex-row gap-1 mx-3">
                  <SlDislike className="text-red-600 text-2xl" />
                  <p>..K</p>
                </div>
                <div className="flex flex-row gap-1 mx-3">
                  <PiShareFat className="text-red-600 text-2xl" />
                  <p>Share</p>
                </div>
                <div className="flex flex-row gap-1 mx-3">
                  <RiPlayListAddFill className="text-red-600 text-2xl" />
                  <p>Save</p>
                </div>
                <div className="flex flex-row gap-1 mx-3">
                  <MdReportProblem className="text-red-600 text-2xl" />
                  <p>Flag</p>
                </div>
                <IoIosMore className="text-2xl" />
                {/* <p>Flags: {video.flags}</p> */}
              </div>
            </div>
          </div>

          <div className="video-details ml-5 flex flex-col-reverse lg:flex-row items-center justify-between w-[100%]">
            <div className="flex flex-row w-[100%] my-5 gap-5 ">
              <div className="flex flex-row gap-2">
                <Image
                  src={``}
                  alt="thumnail"
                  width={10}
                  height={10}
                  className="w-[50px] h-[50px] rounded-2xl mx-5"
                />
                <p className="my-auto text-red-600 text-nowrap"></p>
              </div>
              <button className="p-3 mx-3 bg-[#FF0000] rounded-2xl text-white">
                Subscribe
              </button>
              <HiOutlineBellAlert className="text-red-600 text-4xl my-auto" />
            </div>{" "}
          </div>

          <div className="ml-5 mt-5 ">
            {comments.length > 0 ? (
              <h3 className="my-8 ml-5">... &nbsp; Comments</h3>
            ) : null}
            <div className="flex flex-row">
              <HiUserCircle className="text-6xl" />

              <input
                type="text"
                placeholder="Add a comment..."
                className="bg-[#11112E] mx-3 w-full px-5 border border-1 "
              />
            </div>

            <Comments comments={comments} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;
