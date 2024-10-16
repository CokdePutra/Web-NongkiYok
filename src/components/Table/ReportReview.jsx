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
                    {new Date(report.reported_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.PlaceName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.ReviewBy}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.ReviewContent}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {report.ReporterName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm leading-5 font-medium">
                    <button className="text-white-600 hover:text-indigo-900 mr-2 bg-yellow-500 text-white py-1 px-4 rounded">
                      Ignore
                    </button>
                    <button className="text-white-600 hover:text-indigo-900 bg-red-500 text-white py-1 px-4 rounded">
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
