import React from "react";

const ApplicationCard = ({ application }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold">
        {application.job?.title}
      </h3>

      <p className="text-gray-300">
        {application.job?.company}
      </p>

      <p className="mt-2">
        Status:{" "}
        <span className="capitalize font-medium">
          {application.status}
        </span>
      </p>
    </div>
  );
};

export default ApplicationCard;