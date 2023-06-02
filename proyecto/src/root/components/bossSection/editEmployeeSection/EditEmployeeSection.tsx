import React, { useEffect, useState } from "react";
import SearchInput from "../../ui/searchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import ListEmployee from "../../listEmployee/ListEmployee";
import { selectGetByVariable, selectGetEmployeeByUid } from "@/root/redux/selectors/employee-selector/employee.selector";
import { EmployeesType } from "@/root/types/Employee.type";
import { ResetByVariable, ResetEmployeeByUid, StartDismissEmployee, StartGetByVariable, StartGetEmployeeByUid, StartUpDateEmployee } from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { toast } from "react-hot-toast";
import { defaultSchedule } from "@/root/constants/schedule/schedule";
import InputFloatLabel from "../../ui/InputFloatLabel/InputFloatLabel";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";

export default function EditEmployeeSection() {
  const employeeByUid = useSelector(selectGetEmployeeByUid);
  const dispatch = useDispatch();

  const [clear, setClear] = useState(false);
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [clearInput, setClearInput] = useState(false);

  const employeesListVariable = useSelector(selectGetByVariable);
  const [dataEmployee, setDataEmployee] = useState<EmployeesType>(initialDataEmployee);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(StartUpDateEmployee(dataEmployee.uid || "", dataEmployee));
    setClear(true);
    dispatch(ResetEmployeeByUid());
    dispatch(ResetByVariable());
  };
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

  const handleDismissEmployee = () => {
    console.log("Employee: "+ employeeByUid?.uid)
    //dispatch(StartDismissEmployee(employeeByUid?.uid || ""));
  };

  useEffect(() => {

    if(!employeesListVariable){
      toast.error("List empty")
    }

  }, [])
  

  const handleClear = async () => {
    dispatch(ResetEmployeeByUid());
  };

  return (
    <>
      <div className="flex flex-wrap justify-center bg-white">
        <div className=" md:w-1/2  lg:flex-grow xl:flex-grow w-auto px-2">
          <div className="flex flex-col mb-3">
            <h2 className="font-semibold text-center">Filters</h2>
            <SearchInput labelInputSeekerOne="text" valueEnd={cedula} placeholderSeekerOne="Cedula" typeList="cedula" id="cedula" />
            <SearchInput labelInputSeekerOne="text" valueEnd={name} placeholderSeekerOne="Name" typeList="name" id="name" />
            <SearchInput labelInputSeekerOne="text" valueEnd={jobPosition} placeholderSeekerOne="Job Position" typeList="jobPosition" id="jobPosition" />
            <ListEmployee clear={clear} setClear={setClear} />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:flex-grow xl:flex-grow px-2 py-2 pb-14">
          <form onSubmit={handleUpdate} className="bg-lithBlue bg-opacity-50 shadow-lg p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <InputFloatLabel labelFloat="Name" id="Name" onChange={handleInputChange} name="name" type="text" value={dataEmployee.name} />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel labelFloat="Cedula" id="cedula" onChange={handleInputChange} name="cedula" type="text" value={dataEmployee.cedula} />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel labelFloat="Surname" id="firstSurname" onChange={handleInputChange} name="firstSurname" type="text" value={dataEmployee.firstSurname} />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel labelFloat="Second surname" id="SecondSurname" onChange={handleInputChange} name="secondSurname" type="text" value={dataEmployee.secondSurname} />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel labelFloat="Job position" id="JobPosition" onChange={handleInputChange} name="jobPosition" type="text" value={dataEmployee.jobPosition} />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel labelFloat="Phone Number" id="PhoneNumber" onChange={handleInputChange} name="phoneNumber" type="number" value={dataEmployee.phoneNumber.toString()} />
              </div>
              <div className="flex flex-col col-span-2">
                <InputFloatLabel labelFloat="Salary" id="salary" onChange={handleInputChange} name="salary" type="text" value={dataEmployee.salary.toString()} />
              </div>
            </div>
            <div className=" pt-3 space-x-4 flex justify-center">
              <button
                onClick={handleDismissEmployee}
                className="bg-red   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Dismiss
              </button>

              <button
                type="submit"
                onClick={() => {
                  toast.success("Update");
                }}
                className="bg-blue focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-56 sm:w-auto px-5 py-2.5 text-center "
              >
                Save
              </button>
              <button
                onClick={handleClear}
                className="bg-pink   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
