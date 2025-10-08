import React from "react";

const HomeHeader = () => {
  const names = [
    {
      name: "All",
    },
    {
      name: "The hole of Quran",
    },

    {
      name: "Amazing Nasheed Compilation",
    },
    {
      name: "Beautiful Recitation of Surah Al-Fatiha",
    },
    {
      name: "Quranic Stories: Prophet Yusuf (AS)",
    },
    {
      name: "Tafsir of Surah Al-Baqarah",
    },
    {
      name: "Islamic History: The Life of Prophet Muhammad (PBUH)",
    },
    {
      name: "Islamic Lectures: Understanding the Five Pillars of Islam",
    },
    {
      name: "Islamic Reminders: Importance of Prayer",
    },
    {
      name: "Islamic Stories: The Story of Maryam (AS)",
    },
    {
      name: "Islamic Documentaries: The Kaaba",
    },
    {
      name: "Islamic Events: Hajj Journey 2023",
    },
    {
      name: "Islamic Talks: The Importance of Sadaqah",
    },
    {
      name: "Islamic Debates: Is Music Permissible in Islam?",
    },
    {
      name: "Islamic Education: Learning Arabic for Quranic Understanding",
    },
    {
      name: "Islamic Poetry: Reflections on Jannah",
    },
    {
      name: "Islamic Scholar Interviews: Interview with Mufti Menk",
    },
    {
      name: "Islamic Q&A: Fatwas on Contemporary Issues",
    },
  ];

  // Function to trim titles to maximum of three words

  return (
    <div className="flex flex-row overflow-x-scroll w-[80&] mx-auto scroll scrollbar-none">
      {names.map((video, index) => (
        <div
          key={index}
          className="px-2 lg:px-3 max-md:text-[14px] py-[1px]  lg:py-1 text-nowrap bg-[#FF0000] mx-2 rounded-2xl cursor-pointer"
        >
          {video.name}
        </div>
      ))}
    </div>
  );
};

export default HomeHeader;
