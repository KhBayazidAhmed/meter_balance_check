import React from "react";
import { checkBalance } from "./action";
export const revalidate = 60;
console.log("server page render");
export default async function page() {
  let data = await checkBalance();
  return (
    <div>
      <h1>Meter Balance Check</h1>
      <div>
        Last Data update:{" "}
        {new Date().toLocaleString({ timeZone: "Asia/Dhaka" })}
      </div>
      <div>{/* <TimeShow /> */}</div>
      {data.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Meter NAME
                </th>
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
                    {item.name}
                  </td>
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
