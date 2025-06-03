import React from "react";
// import { usePushNotifications } from "../_hooks/usePushNotifications";

const NotificationPermission: React.FC = () => {
  // const { permission, isSupported, requestPermission } = usePushNotifications();

  // if (!isSupported) {
  //   return (
  //     <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
  //       <div className="flex items-center">
  //         <span className="text-lg mr-2">⚠️</span>
  //         <p>Push notifications are not supported in this browser.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (permission === "granted") {
  //   return (
  //     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
  //       <div className="flex items-center">
  //         <span className="text-lg mr-2">✅</span>
  //         <p>Browser notifications are enabled!</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (permission === "denied") {
  //   return (
  //     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
  //       <div className="flex items-center">
  //         <span className="text-lg mr-2">🚫</span>
  //         <div>
  //           <p className="font-semibold">Notifications are blocked</p>
  //           <p className="text-sm mt-1">
  //             To enable notifications, click the notification icon in your
  //             {`browser's`} address bar or go to browser settings and allow
  //             notifications for this site.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg mr-2">🔔</span>
          <div>
            <p className="font-semibold">Enable Browser Notifications</p>
            <p className="text-sm mt-1">
              Get notified instantly when new notifications arrive.
            </p>
          </div>
        </div>
        <button
          onClick={() => {}}
          // onClick={requestPermission}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Enable Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPermission;
