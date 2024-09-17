import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Loading...</h1>
      {console.log("loading")}
      <div className="mt-4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}
