import React from "react";
import { TableScheduleProps, RowSchedule } from "../../interface/employee";

const row = [
  { name: "Evander Jiménez", cedula: 208170802, entryTime: "03:00", exitTime: "04:00" },
  { name: "Dario Mora", cedula: 109090090, entryTime: "03:00", late: "04:00" },
  { name: "José Vargas", cedula: 509987123, entryTime: "03:00", late: "04:00" },
  { name: "José Dario", cedula: 208170802, entryTime: "03:00", late: "04:00" },
  { name: "Dario José", cedula: 109090090, entryTime: "03:00", late: 18 },
];
const EmployeeTableViewSchedule: React.FC<TableScheduleProps> = ({ rows }) => {
  return (
    <table className="border-collapse w-full bg-white">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">ID number</th>
          <th className="border p-2">entryTime</th>
          <th className="border p-2">ExitTime</th>
          <th className="border p-2">Edit schedule</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row: RowSchedule, index: number) => (
          <tr key={index}>
            <td className="border p-2">{row.name}</td>
            <td className="border p-2">{row.cedula}</td>
            <td className="border p-2">{row.entryTime}</td>
            <td className="border p-2">{row.exitTime}</td>
            <td className="border p-2">
              <div className="flex justify-center">
                <button className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded">Edit</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTableViewSchedule;
