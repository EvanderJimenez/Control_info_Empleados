import React from "react";
import { useSelector } from "react-redux";
import { selectLogin } from "@/root/redux/selectors/employee-selector/employee.selector";
import InputFloatLabel from "../../ui/InputFloatLabel/InputFloatLabel";

const EmployeeProfile = () => {
  const UserLogin = useSelector(selectLogin);
  const cedula: string = UserLogin?.cedula.toString() || "";
  const phoneNumberString: string = UserLogin?.phoneNumber.toString() || "";
  const salary: string = UserLogin?.salary.toString() || "";

  return (
    <>
      <div className="bg-lithGray flex xl:h-screen flex-col  lg:flex-wrap items-center p-12 ">
        <div className="flex items-center justify-center">
          <img src="/Images/profileIcon.gif" width={100} height={100} alt="Picture of the author" />
        </div>

        <div className="flex items-center justify-center space-x-10">
          <div className=" mt-4 w-full space-y-7 sm:w-auto">
            <InputFloatLabel id="name" labelFloat="Name" name="name" onChange={() => {}} type="text" value={UserLogin?.name || ""} />
            <InputFloatLabel id="surname" labelFloat="Surname" name="" onChange={() => {}} type="text" value={UserLogin?.firstSurname || ""} />
            <InputFloatLabel id="secondSurname" labelFloat="Second surname" name="" onChange={() => {}} type="text" value={UserLogin?.secondSurname || ""} />
            <InputFloatLabel id="cedula" labelFloat="cedula" name="" onChange={() => {}} type="text" value={cedula} />
          </div>

          <div className=" mt-4 w-full space-y-7 sm:w-auto">
          <InputFloatLabel id="email" labelFloat="Email" name="" onChange={() => {}} type="text" value={UserLogin?.email || ""} />
          <InputFloatLabel id="phoneNumber" labelFloat="Phone Number" name="" onChange={() => {}} type="text" value={phoneNumberString} />
          <InputFloatLabel id="JonPosition" labelFloat="Job position" name="" onChange={() => {}} type="text" value={UserLogin?.jobPosition || ""} />
          <InputFloatLabel id="Salary" labelFloat="Salary" name="" onChange={() => {}} type="text" value={salary} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
