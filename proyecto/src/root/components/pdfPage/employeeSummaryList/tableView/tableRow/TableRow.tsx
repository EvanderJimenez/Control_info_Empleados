import React from 'react';

export interface TableRowProps {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
}

const TableRow: React.FC<TableRowProps> = ({ column1, column2, column3,column4 }) => {
  return (
    <tr className="odd:bg-lithBlue even:bg-lithGray">
      <td className="print:border p-2 ">{column1}</td>
      <td className="print:border p-2">{column2}</td>
      <td className="print:border p-2">{column3}</td>
      <td className="print:border p-2">{column4}</td>

    </tr>
  );
};

export default TableRow;
