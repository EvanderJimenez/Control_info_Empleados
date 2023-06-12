import React, { useEffect, useId, useState } from "react";
import SearchInput from "../../ui/searchInput/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import ListEmployee from "../../listEmployee/ListEmployee";
import {
  selectGetByVariable,
  selectGetEmployeeByUid,
  selectGetEmployeeByUid2,
  selectGetFileURLByName,
} from "@/root/redux/selectors/employee-selector/employee.selector";
import { EmployeesType, Files } from "@/root/types/Employee.type";
import {
  ResetByVariable,
  ResetEmployeeByUid,
  ResetEmployeeByUid2,
  StarGetFileURLByName,
  StartDismissEmployee,
  StartGetByVariable,
  StartGetEmployeeByUid,
  StartResetEmployeesByIdDepartment,
  StartResetUrl,
  StartUpDateEmployee,
} from "@/root/redux/thunks/employee-thunk/employee.thunk";
import { toast } from "react-hot-toast";

import InputFloatLabel from "../../ui/InputFloatLabel/InputFloatLabel";
import { initialDataEmployee } from "@/root/constants/employee/employee.constants";
import ComboBoxDocuments from "../../employeeSection/documentsEmployee/components/comboBoxDocuments/ComboBoxDocuments";
import { saveAs } from "file-saver";
import { b64toBlob } from "@/root/utils/base64/base64";
import ListAllEmployees from "./components/listAllEmployees/ListAllEmployees";
import Swal from 'sweetalert2';

export default function EditEmployeeSection() {
  const fileLoad = useSelector(selectGetFileURLByName);
  const employeeByUid2 = useSelector(selectGetEmployeeByUid2);
  const dispatch = useDispatch();

  const [clear, setClear] = useState(false);
  const [cedula, setCedula] = useState("");
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [clearInput, setClearInput] = useState(false);
  const [change, setChange] = useState(false);
  const [listEmployees, setListEmployees] = useState<EmployeesType[]>([]);

  const employeesListVariable = useSelector(selectGetByVariable);
  const [dataEmployee, setDataEmployee] =
    useState<EmployeesType>(initialDataEmployee);
  const [selectOption, setSelectOption] = useState<Files | null>(null);
 //TODO: This code has a nested innecesary complexity, consider split in a new hook 
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(dataEmployee.uid){
     
    dispatch(StartUpDateEmployee(dataEmployee.uid || "", dataEmployee));
    setClear(true);
handleClear()
    toast.success("saved successfully");
    }else {
      toast("⚠ No employees have been loaded ");
    }

  };
  useEffect(() => {
    if (!clear) {//TODO: improve this statement to get simplicity
      if (employeeByUid2) {
        setDataEmployee(employeeByUid2);
      }
    } else {
      setDataEmployee(initialDataEmployee);
    }
  }, [employeeByUid2, clear]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDismissEmployee = () => {
    if (employeeByUid2 && employeeByUid2.uid) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to dismiss an employee',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, dismiss',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          //dispatch(StartDismissEmployee(employeeByUid2.uid));
          console.log("enter dismiss")//TODO: Remove all logs
          toast.error('Fired employee');
        }
      });
    } else {//TODO: improve this statement to get simplicity
      toast('⚠ No employees have been loaded');
    }
  };
  

  const handleDownload = async () => {
    dispatch(
      StarGetFileURLByName(
        employeeByUid2?.uid || "",
        selectOption?.urlFile || ""
      )
    );
    setChange(!change);
  };

  useEffect(() => {
    if (!employeesListVariable) {
      toast.error("List empty");
    }
  }, []);

  const handleClear = async () => {
    if (!Swal.isVisible()) {
    console.log("object")//TODO: Remove all logs
    if(dataEmployee.uid){
      dispatch(ResetEmployeeByUid2());
      dispatch(StartResetEmployeesByIdDepartment())
      setListEmployees([])
      dispatch(ResetByVariable());
      toast.success("Clear all");
    }else {
      setListEmployees([])
      dispatch(ResetEmployeeByUid2());
      dispatch(StartResetEmployeesByIdDepartment())
    }
  }
  };

  useEffect(() => {
    if (fileLoad && selectOption) {
      const base64Data = fileLoad.replace(/^data:.*,/, "");
      const blob = b64toBlob(base64Data);
      let newFile;
      if (selectOption.type === "pdf") {
        newFile = new File([blob], selectOption.name + ".pdf", {
          type: "application/pdf",
        });
        saveAs(newFile, selectOption.name);

        dispatch(StartResetUrl());
      } else if (selectOption.type === "image") {
        newFile = new File([blob], selectOption.name + ".png", {
          type: "image/png",
        });
        saveAs(newFile, selectOption.name);

        dispatch(StartResetUrl());
      }
    }
  }, [fileLoad, change]);

  const files: Files[] = employeeByUid2?.files
    ? Object.values(employeeByUid2.files)
    : [];
    
    const countEmployees = listEmployees.length

  return (
    <>
    <h1 className="text-center font-bold text-darkBlue  text-lg">Employee editing section</h1>
    <p className="text-center font-semibold pb-5">search and load the information of the employee to edit</p>
      <div className="flex flex-wrap justify-center bg-white">
        <div className=" md:w-1/2  lg:flex-grow xl:flex-grow w-auto px-2">
          <div className="flex flex-col mb-3">
            <h2 className="font-semibold text-center">Filters</h2>
            <SearchInput
              labelInputSeekerOne="text"
              valueEnd={cedula}
              placeholderSeekerOne="Cedula"
              typeList="cedula"
              id="cedula"
            />
            <SearchInput
              labelInputSeekerOne="text"
              valueEnd={name}
              placeholderSeekerOne="Name"
              typeList="name"
              id="name"
            />
            <SearchInput
              labelInputSeekerOne="text"
              valueEnd={jobPosition}
              placeholderSeekerOne="Job Position"
              typeList="jobPosition"
              id="jobPosition"
            />
            <ListAllEmployees />
            <div className="flex justify-center text-darkBlue font-semibold"><p>charged employees: {countEmployees}</p></div>
            
            <ListEmployee clear={clear} setClear={setClear} listEmployees={listEmployees} setListEmployees={setListEmployees} />
          </div>
        </div>
        {/* //TODO: This code has a nested innecesary complexity, consider split in a new component */}
        <div className="w-full md:w-1/2 lg:flex-grow xl:flex-grow px-2 py-2 pb-14">
          <form
            onSubmit={handleUpdate}
            className="bg-lithBlue bg-opacity-50 shadow-lg p-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Name"
                  id="Name"
                  onChange={handleInputChange}
                  name="name"
                  type="text"
                  value={dataEmployee.name}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Cedula"
                  id="cedula"
                  onChange={handleInputChange}
                  name="cedula"
                  type="text"
                  value={dataEmployee.cedula}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Surname"
                  id="firstSurname"
                  onChange={handleInputChange}
                  name="firstSurname"
                  type="text"
                  value={dataEmployee.firstSurname}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Second surname"
                  id="SecondSurname"
                  onChange={handleInputChange}
                  name="secondSurname"
                  type="text"
                  value={dataEmployee.secondSurname}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Job position"
                  id="JobPosition"
                  onChange={handleInputChange}
                  name="jobPosition"
                  type="text"
                  value={dataEmployee.jobPosition}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Phone Number"
                  id="PhoneNumber"
                  onChange={handleInputChange}
                  name="phoneNumber"
                  type="number"
                  value={dataEmployee.phoneNumber.toString()}
                />
              </div>
              <div className="flex flex-col col-span-2">
                <InputFloatLabel
                  labelFloat="Salary"
                  id="salary"
                  onChange={handleInputChange}
                  name="salary"
                  type="text"
                  value={dataEmployee.salary.toString()}
                />
              </div>
            </div>
            <div className=" pt-3 space-x-4 flex justify-between">
              <button
                onClick={handleDismissEmployee}
                className="bg-darkBlue hover:border-red hover:rounded-lg focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Dismiss
              </button>

              <button
                type="submit"
                className="bg-darkBlue focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-56 sm:w-auto px-5 py-2.5 text-center "
              >
                Save
              </button>
              <button
                onClick={handleClear}
                className="bg-darkBlue   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Clear
              </button>
            </div>
          </form>
          <div className=" flex flex-row justify-center items-center">
            <ComboBoxDocuments
              label="Documents of employee"
              selectedOption={selectOption}
              setSelectedOption={setSelectOption}
              items={files}
            />
            {selectOption ? (
              <div className="flex flex-col m-5">
                <label className="font-semibold">
                  Name: {selectOption.name}
                </label>
                <button
                  className="bg-darkBlue font-semibold"
                  onClick={handleDownload}
                >
                  Download file 📃
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
