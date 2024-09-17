"use client";
import { useState } from "react";
import { revalidate } from "@/app/action";

export default function TimeShow() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          let res = await revalidate();
          setLoading(false);
        }}
      >
        Refetch Data
      </button>
      {loading && <div className="mt-4 text-blue-500">Loading...</div>}
    </div>
  );
}
