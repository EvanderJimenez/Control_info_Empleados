import React, { useState, useEffect } from "react";
import ListBoss from "./components/listBoss/ListBoss";
import { EmployeesType } from "@/root/types/Employee.type";
import { useDispatch, useSelector } from "react-redux";
import { StartUpDateEmployee, selectGetEmployeeByUid } from "@/root/redux";
import RegisterFormEmployee from "./components/formEmployee/RegisterFormEmployee";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import toast from "react-hot-toast";

const BossControl = () => {
  const dispatch = useDispatch();
  const employeeByUid = useSelector(selectGetEmployeeByUid);
  const [clear, setClear] = useState(false);

  const [dataEmployee, setDataEmployee] = useState<EmployeesType>(initialDataEmployee);

  useEffect(() => {
    if (!clear) {
      if (employeeByUid) {
        setDataEmployee(employeeByUid);
      }
    } else {
      setDataEmployee(initialDataEmployee);
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
    <>
      <h1 className="text-center font-bold text-darkBlue text-lg pb-5">Edit boss section</h1>
      <div className="flex flex-wrap pb-8 h-screen ">
        <section className="flex flex-col md:w-2/3 items-center py-4 px-4 bg-white">
          <div className="p-4  rounded flex justify-end shadow-lg w-full m-auto">
            <RegisterFormEmployee handleInputChange={handleInputChange} userData={dataEmployee} upDate={handleUpdate} />
          </div>
        </section>
        <section className="flex-grow flex md:w-1/3 pt-10 justify-center">
          <ListBoss clear={clear} setClear={setClear} />
        </section>
      </div>
    </>
  );
};
export default BossControl;
