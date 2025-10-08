"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { getCookie } from "cookies-next";
import { PuffLoader } from "react-spinners";

const Page: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    thumbnail: File | null;
    video: File | null;
  }>({
    title: "",
    description: "",
    thumbnail: null,
    video: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const token = getCookie("token") as string;
    console.log("tooken is", token);

    const uploadData = new FormData();
    uploadData.append("Title", formData.title);
    uploadData.append("Description", formData.description);
    if (formData.thumbnail)
      uploadData.append("UploadThumbnail", formData.thumbnail);
    if (formData.video) uploadData.append("Video", formData.video);

    try {
      const response = await axios.post(
        "https://arabtubedemo1.runasp.net/api/Videos/Upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success:", response.data);
      // Handle success (e.g., show a success message or redirect the user)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#11112E] w-[100%] min-h-[100vh]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row w-full mt-[145px]">
          <Sidebar />
          <div className="h-full overflow-hidden w-[80%] mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 mx-5 px-3 "
            >
              <label className="text-white">
                Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-[#1E1E1E] border border-gray-600 rounded"
                  required
                />
              </label>
              <label className="text-white">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-[#1E1E1E] border border-gray-600 rounded"
                  required
                />
              </label>
              <label className="text-white">
                Upload Thumbnail
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 mt-2 bg-[#1E1E1E] border border-gray-600 rounded"
                  required
                />
              </label>
              <label className="text-white">
                Video
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleChange}
                  className="w-full p-2 mt-2  bg-[#1E1E1E] border border-gray-600 rounded"
                  required
                />
              </label>
              <button
                type="submit"
                className="w-[80%] mx-auto py-2  px-2 mt-[50px] bg-[#FF0000]  rounded-xl text-white text-center "
                disabled={loading}
              >
                {loading ? (
                  <PuffLoader className="text-center  mx-auto " color="#FFF" />
                ) : (
                  "Upload"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
