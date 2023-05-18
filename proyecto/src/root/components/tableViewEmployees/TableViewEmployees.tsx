import React from "react";
import { TableProps } from "../../interface/employee";//TODO:You should use relative paths with @

interface Row {
  name: string;
  cedula: number;
  email: string;
  late: number;
}

const TableViewEmployees: React.FC<TableProps> = ({ rows }) => {
  return (
    <table className="border-collapse w-full bg-white">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">ID number</th>
          <th className="border p-2">Schedule noncompliance</th>
          <th className="border p-2">Request justification</th>
          <th className="border p-2">Generate report</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row: Row, index: number) => (
          <tr key={index}>
            <td className="border p-2">{row.name}</td>
            <td className="border p-2">{row.email}</td>
            <td className="border p-2">{row.cedula}</td>
            <td className="border p-2">{row.late}</td>
            <td className="border p-2">
              <div className="flex justify-center">
                <button className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded">Send</button>
              </div>
            </td>
            <td className="border p-2">
              <div className="flex justify-center">
                <button className="bg-red hover:bg-white hover:text-black hover:border-black text-white font-bold py-2 px-4 rounded border border-white">Generate</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableViewEmployees;
