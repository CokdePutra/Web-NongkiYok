import React from "react";
import Navbar from '../components/Navbar/Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-[100vh] p-6 md:p-12">
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img 
            src="./img/Card/manwithcoffee.png" 
            alt="Person with coffee" 
            className="object-contain max-w-full h-auto"
          />
        </div>
        <div className="bg-yellow-500 p-12 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-black text-5xl font-bold mb-6 kodchasan-bold text-center">Contact US</h2>
          <form>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Name . . ."
                className=" jura-medium w-full p-4 rounded-lg text-lg border border-gray-300 focus:border-yellow-700 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email . . ."
                className="jura-medium w-full p-4 rounded-lg text-lg border border-gray-300 focus:border-yellow-700 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Message . . ."
                className="jura-medium w-full p-4 rounded-lg text-lg border border-gray-300 focus:border-yellow-700 focus:ring-2 focus:ring-yellow-500"
                rows="6"
              ></textarea>
            </div>
            <button
              type="submit"
              className="jura-medium w-full bg-black text-yellow-500 p-4 rounded-lg text-lg hover:bg-yellow-600 hover:text-black transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
