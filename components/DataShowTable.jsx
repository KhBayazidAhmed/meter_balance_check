"use client";

import React from "react";
import { checkBalance } from "../app/action";

async function getData() {
  const data = await checkBalance();
  return data;
}

export default function DataShowTable() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setLoading(true);
          getData().then((data) => {
            setData(data);
            setLoading(false);
          });
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Check Balance
      </button>

      {loading && <div className="mt-4 text-blue-500">Loading...</div>}

      {data.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Meter ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Last Recharge
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Recharge Time
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Remaining Balance
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Reading Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.meterId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.lastRecharge}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.rechargeTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.remainingBalance}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.readingTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
