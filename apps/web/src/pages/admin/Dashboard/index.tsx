import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ManageEvent from "../manage-event";
import CreateEvent from "../create-event";

const Dashboard = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-gray-800 text-white">
          <div className="p-5 text-2xl font-semibold">Admin Dashboard</div>
          <nav className="mt-5">
            <ul>
              <li>
                <Link
                  to="/manage-events"
                  className="block py-2 px-4 text-lg hover:bg-gray-700"
                >
                  Manage Events
                </Link>
              </li>
              <li>
                <Link
                  to="/create-event"
                  className="block py-2 px-4 text-lg hover:bg-gray-700"
                >
                  Create Event
                </Link>
              </li>
              {/* Tambahkan link untuk menu lainnya seperti Analytics */}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/manage-events" element={<ManageEvent />} />
            <Route path="/create-event" element={<CreateEvent />} />
            {/* Tambahkan route untuk komponen lainnya */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
