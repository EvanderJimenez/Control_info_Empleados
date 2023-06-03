import React from "react";

export const LoadIndicator = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div id="container" className="flex flex-col">
        <div id="cubo" className="mb-4">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div id="loading">
          <div>
            <h1 className="text-3xl font-bold text-white">Loading</h1>
            <p className="text-xl text-white ">...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
