import React from "react";
import { checkBalance } from "./action";
export const revalidate = 60;
console.log("server page render");

export default async function page() {
  let data = await checkBalance();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mt-6 mb-4">
        Meter Balance Check
      </h1>
      <div className="text-center text-gray-500 mb-6">
        Last Data update:{" "}
        {new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}
      </div>
      {data.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Meter NAME
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Remaining Balance
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Last Recharge
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Recharge Time
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Meter ID
                </th>

                <th className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Reading Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
                    {item.remainingBalance}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
                    {item.lastRecharge}
                  </td>

                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
                    {item.rechargeTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
                    {item.meterId}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
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
