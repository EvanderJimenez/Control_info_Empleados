import { StarGetEmployeesByIdDepartment, selectGetEmployeesByIdDepartment, selectLogin } from "@/root/redux";
import { getEmployeesByIdDepartmentReducer } from "@/root/redux/reducers/employee-reducer/getEmployeesByIdDepartment/GetEmployeesByIdDepartmentReducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ListAllEmployees = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(selectLogin)
  const lisTEmployees = useSelector(selectGetEmployeesByIdDepartment) 
  const handleSearch = async () => {

    if(lisTEmployees.length === 0) {
    dispatch(StarGetEmployeesByIdDepartment(userLogin?.idDepartment || ''))
    console.log(lisTEmployees)
    }
    console.log(lisTEmployees)
  };

  return (
    <div> 
      <button
        onClick={handleSearch}
        className="bg-darkBlue ml-2 flex justify-center"
      >
        All employees
        <img src="/Images/searchIcon.png" alt="" />
      </button>
    </div>
  );
};

export default ListAllEmployees;
