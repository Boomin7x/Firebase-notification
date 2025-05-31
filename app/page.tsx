"use client";
import React, { useState } from "react";
import { createNotification } from "./utils/notification.service";
import NotificationCenter from "./_component/NotificationCenter";

const HomePage: React.FC = () => {
  const [userId] = useState("user123"); // In real app, get from auth

  const handleCreateTestNotification = async (
    type: "info" | "success" | "warning" | "error"
  ) => {
    const titles = {
      info: "New Information",
      success: "Action Completed",
      warning: "Warning Alert",
      error: "Error Occurred",
    };

    const messages = {
      info: "Here is some important information for you.",
      success: "Your action has been completed successfully!",
      warning: "Please review this warning message.",
      error: "Something went wrong. Please try again.",
    };

    try {
      await createNotification(titles[type], messages[type], type, userId);
    } catch (error) {
      console.error("Failed to create notification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Real-time Notification System
        </h1>

        {/* Test buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Test Notifications</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCreateTestNotification("info")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Create Info
            </button>
            <button
              onClick={() => handleCreateTestNotification("success")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Create Success
            </button>
            <button
              onClick={() => handleCreateTestNotification("warning")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              Create Warning
            </button>
            <button
              onClick={() => handleCreateTestNotification("error")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Create Error
            </button>
          </div>
        </div>

        {/* Notification Center */}
        <NotificationCenter userId={userId} />
      </div>
    </div>
  );
};

export default HomePage;
