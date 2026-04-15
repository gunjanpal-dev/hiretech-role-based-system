// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-10 h-10 border-4 border-t-pink-300 border-b-pink-300 border-l-white border-r-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;