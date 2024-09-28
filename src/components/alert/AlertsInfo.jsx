import React from "react";

const InfoAlert = ({ title, text, link, linkname }) => {
  return (
    <div className="relative flex items-center justify-center w-full max-w-lg lg:max-w-2xl mx-auto gap-4 p-5 mt-5">
      <div
        className="flex items-center p-4 mb-4 text-base md:text-sm lg:text-base text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-6 h-6 md:w-5 md:h-5 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium text-lg md:text-base">
            {title}&nbsp;
          </span>
          {text}
          &nbsp; &nbsp;
          <a
            href={link}
            className="font-medium text-green-800 underline dark:text-green-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300"
          >
            {linkname}
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;
