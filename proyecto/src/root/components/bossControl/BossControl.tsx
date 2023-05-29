import React, { useState, useEffect } from "react";
import ListBoss from "./components/listBoss/ListBoss";
import { EmployeesType } from "@/root/types/Employee.type";
import { useDispatch, useSelector } from "react-redux";
import { StartUpDateEmployee, selectGetEmployeeByUid } from "@/root/redux";
import RegisterFormEmployee from "./components/formEmployee/RegisterFormEmployee";

const BossControl = () => {
  const dispatch = useDispatch();
  const employeeByUid = useSelector(selectGetEmployeeByUid);
  const [clear, setClear] = useState(false);

  const [dataEmployee, setDataEmployee] = useState<EmployeesType>({
    uid: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    cedula: 0,
    phoneNumber: 0,
    photo: "",
    jobPosition: "",
    salary: 0,
    enabled: true,
    idDepartment: "",
    password: "",
    email: "",
    boss: "",
    schedule: [],
    vacations: {},
    attendance: {},
  });

  useEffect(() => {
    if (!clear) {
      if (employeeByUid) {
        setDataEmployee(employeeByUid);
      }
    } else {
      setDataEmployee({
        uid: "",
        name: "",
        firstSurname: "",
        secondSurname: "",
        cedula: 0,
        phoneNumber: 0,
        photo: "",
        jobPosition: "",
        salary: 0,
        enabled: true,
        idDepartment: "",
        password: "",
        email: "",
        boss: "",
        schedule: [],
        vacations: {},
        attendance: {},
      });
    }
  }, [employeeByUid, clear]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(StartUpDateEmployee(dataEmployee.uid, dataEmployee));
    setClear(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <section className="flex flex-col items-center py-4 px-4 bg-white shadow-md">
        <ListBoss clear={clear} setClear={setClear} />
      </section>
      <section className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="p-4 bg-white rounded shadow-lg max-w-xl m-auto">
          <RegisterFormEmployee
            handleInputChange={handleInputChange}
            userData={dataEmployee}
            upDate={handleUpdate}
          />
        </div>
      </section>
    </div>
  );
};
export default BossControl;
