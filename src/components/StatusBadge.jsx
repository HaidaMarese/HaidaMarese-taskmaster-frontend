import React from "react"; 

function StatusBadge({ status }) {
  const colorMap = {
    "In Progress": "bg-blue-100 text-blue-700",
    "Done": "bg-gray-200 text-gray-600",
    "To Do": "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${colorMap[status] || ""}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
