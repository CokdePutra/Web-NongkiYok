import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ReportReview = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [userRole, setUserRole] = useState(null);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/session`, {
          withCredentials: true,
        });
        const role = response.data.role;
        setUserRole(role);
        if (role !== "Admin") {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/ReportReview`, {
          withCredentials: true,
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };

    fetchReports();
  }, []);
  const handleIgnore = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Ignore this report it will not be deleted, but only clear from the list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Ignore it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/ClearListReview/${id}`, {
          withCredentials: true,
        });
        Swal.fire({
          title: "Success!",
          text: "Report has been ignored and cleared from the list.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            window.location.reload();
          }
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          title: "Faild!",
          text: "Failed to ignore the report: " + error,
          icon: "error",
        });
      }
    }
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "deleted this report it will be deleted for everyone and cleared from the list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deleted it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/DeleteReview/${id}`, {
          withCredentials: true,
        });
        Swal.fire({
          title: "Success!",
          text: "Report has been Deleted for everyone and cleared from the list.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            window.location.reload();
          }
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          title: "Faild!",
          text: "Failed to deleted the report: " + error,
          icon: "error",
        });
      }
    }
  };
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? "★" : "";
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar}
        {"☆".repeat(emptyStars)}
      </>
    );
  };
  return (
    <div className="container mx-auto p-4 rounded mb-4 max-w-screen-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl kodchasan-bold text-white">Review Reports</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="relative max-h-[500px] overflow-y-auto rounded-lg">
          <table className="min-w-full table-fixed bg-white">
            <thead className="sticky top-0 bg-white shadow">
              <tr>
                <th className="w-40 px-4 py-2">Date</th>
                <th className="w-40 px-4 py-2">Place Name</th>
                <th className="w-64 px-4 py-2">Review By</th>
                <th className="w-64 px-4 py-2">Rating by reviewer</th>
                <th className="w-64 px-4 py-2">Review Content</th>
                <th className="w-40 px-4 py-2">Reporter Name</th>
                <th className="w-40 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-center divide-gray-200">
              {reports.map((report) => (
                <tr key={report.Id_Report}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(report.reported_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.PlaceName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.ReviewBy}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-yellow-400">
                    {renderRatingStars(report.Rating)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.ReviewContent}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.ReporterName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm leading-5 font-medium">
                    <button
                      className="text-white-600 hover:text-indigo-900 mr-2 bg-yellow-500 text-white py-1 px-4 rounded"
                      onClick={() => handleIgnore(report.Id_Report)}
                    >
                      Ignore
                    </button>
                    <button
                      className="text-white-600 hover:text-indigo-900 bg-red-500 text-white py-1 px-4 rounded"
                      onClick={() => handleDelete(report.Id_Report)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportReview;
