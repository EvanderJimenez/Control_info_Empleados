import React from "react";
import TableRow, { TableRowProps } from "../tableRow/TableRow";

interface TableProps {
  columnTitles: string[];
  rows: TableRowProps[];
}

export interface TableColumnProps {
  title: string;
}

export const TableColumn: React.FC<TableColumnProps> = ({ title }) => {
  return <th>{title}</th>;
};

const TableView: React.FC<TableProps> = ({ columnTitles, rows }) => {
    return (
      <table className="print:w-full  print:max-w-full w-full text-center border-none">
        <thead className="bg-black">
          <tr className="bg-black text-white">
            {columnTitles.map((title, index) => (
              <TableColumn key={index} title={title} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TableRow key={index} {...row} />
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TableView;
