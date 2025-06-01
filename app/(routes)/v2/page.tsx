"use client";
import React from "react";
import useFCM from "./_hooks/useFCM";

const V2Page = () => {
  const { permission, requestPerm } = useFCM();
  return (
    <div className="p-4 w-screen h-screen overflow-y-auto overflow-x-hidden">
      <div className=" bg-gradient-to-b p-4 rounded-lg from-gray-200 to-white size-full">
        <div>Notification V2 Test</div>
        <button>
          <span className="text-blue-500 hover:underline" onClick={requestPerm}>
            Request Notification Permission
          </span>
        </button>
        <div>{permission}</div>
        v2Page
      </div>
    </div>
  );
};

export default V2Page;
