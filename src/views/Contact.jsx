import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar/Navbar";

const Contact = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fetch user email from session when the component mounts
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session/`, {
          withCredentials: true,
        });
        if (response.data) {
          setEmail(response.data.email);
          setName(response.data.name);
        }
      } catch (error) {
        console.error("Error fetching user email from session");
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email format before submitting
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    setEmailError(""); // Clear the error message if email is valid

    try {
      await axios.post(`${baseURL}/api/contact`, {
        name,
        email,
        message,
      });
      Swal.fire({
        title: "Success sending!",
        text: "Your message has been sent successfully!",
        icon: "success",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message", error);
      Swal.fire({
        title: "Error sending message!",
        text: "Failed to send your message. Please try again later.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-[100vh] p-6 md:p-12">
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img
            src="./img/Card/manwithcoffee.png"
            alt="Person with coffee"
            className="object-contain max-w-full h-auto hidden lg:block"
          />
        </div>
        <div className="bg-yellow-500 p-12 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-black text-5xl font-bold mb-6 kodchasan-bold text-center">
            Contact US
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Name . . ."
                className="jura-medium w-full p-4 rounded-lg text-lg border border-gray-300 focus:border-yellow-700 focus:ring-2 focus:ring-yellow-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email . . ."
                className="jura-medium w-full p-4 rounded-lg text-lg border border-gray-300 focus:border-yellow-700 focus:ring-2 focus:ring-yellow-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <p className="text-color-red text-sm mt-2 font-bold">
                  {emailError}
                </p>
              )}
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Message . . ."
                className="jura-medium w-full p-4 rounded-lg text-lg border border-gray-300 focus:border-yellow-700 focus:ring-2 focus:ring-yellow-500"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="jura-medium w-full bg-black text-yellow-500 p-4 rounded-lg text-lg hover:bg-yellow-600 hover:text-black transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
