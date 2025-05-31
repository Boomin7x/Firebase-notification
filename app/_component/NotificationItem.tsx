// components/NotificationItem.tsx
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Notification } from "../utils/types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50";
      case "error":
        return "border-l-red-500 bg-red-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <div
      className={`border-l-4 p-4 mb-3 rounded-r-lg ${getTypeStyles(
        notification.type
      )} ${!notification.read ? "ring-2 ring-opacity-50 ring-blue-400" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-lg">{getTypeIcon(notification.type)}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">
              {notification.title}
            </h4>
            <p className="text-gray-700 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Mark as read
            </button>
          )}
          <button
            onClick={() => onDelete(notification.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
