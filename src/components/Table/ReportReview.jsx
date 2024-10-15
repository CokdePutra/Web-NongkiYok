import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ReportReview = () => {
  const baseURL = import.meta.env.VITE_REACT_API_URL;
  const [userRole, setUserRole] = useState(null);
  const [reports, setReports] = useState([]); // Mengganti state menjadi reports
  const [isSending, setIsSending] = useState(false); // State untuk loading

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
        const response = await axios.get(`${baseURL}/api/review/reports`, {
          withCredentials: true,
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this after delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/review/reports/delete/${id}`, {
          withCredentials: true,
        });
        setReports(reports.filter((report) => report.Id_Report !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Report has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting report", error);
      }
    }
  };

  const handleIgnore = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to ignore this report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, ignore it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`${baseURL}/api/review/reports/ignore/${id}`, {
          withCredentials: true,
        });
        setReports(reports.filter((report) => report.Id_Report !== id));
        Swal.fire({
          title: "Ignored!",
          text: "The report has been ignored.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error ignoring report", error);
      }
    }
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
                <th className="w-64 px-4 py-2">Review Content</th>
                <th className="w-40 px-4 py-2">Reporter Name</th>
                <th className="w-40 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-center divide-gray-200">
              {reports.map((report) => (
                <tr key={report.Id_Report}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(report.report_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.place_name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.review_by}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.review_content}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.reporter_name}
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
