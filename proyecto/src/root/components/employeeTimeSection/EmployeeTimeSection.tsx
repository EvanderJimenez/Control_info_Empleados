import React from "react";
import SearchInput from "../searchInput/SearchInput";
import TableViewEmployees from "../tableViewEmployees/TableViewEmployees";
import RequestVacationSection from "../requestVacationSection/RequestVacationSection";
import ParameterBar from "../parameterBar/ParameterBar";

const rows = [
    { name: 'Evander Jiménez', cedula: 208170802, email: 'alexevander2001@gmail.com', late:0 },
    { name: 'Dario Mora', cedula: 109090090, email: 'DarkVar2k@gmail.com', late:20 },
    { name: 'José Vargas', cedula: 509987123, email: 'JosesitoMainkra28@gmail.com',late:30 },
    { name: 'José Dario', cedula: 208170802, email: 'JosesitoMainkra28@gmail.com', late:80 },
    { name: 'Dario José', cedula: 109090090, email: 'DarkVar2k@gmail.com', late:18 }
  ];

export default function EmployeeTimeSection() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="flex-1 flex flex-col lg:w-1/2  md:w-full">
        <ParameterBar/>
          <SearchInput labelInputSeekerOne="email"  placeholderSeekerOne="Enter the email to search" valueEnd={""} />
          <TableViewEmployees rows={rows} />
        </div>
      </div>
    </>
  );
}
