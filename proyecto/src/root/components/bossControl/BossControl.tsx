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
    <div className="flex flex-col">
      <section className="flex flex-col">
        <ListBoss clear={clear} setClear={setClear} />
      </section>
      <section className="min-h-screen bg-gray-100 flex flex-col justify-center">
        <div className="m-3 flex flex-wrap justify-center">
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
