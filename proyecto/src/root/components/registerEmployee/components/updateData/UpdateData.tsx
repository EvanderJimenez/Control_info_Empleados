import React, { useState } from 'react';
import { UserData } from '@/root/interface/employee';
import InputLabel from '../inputLabel/InputLabel';
import Schedule from '../schedule/Schedule';


interface UpdateDataProps {
  userData: UserData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleScheduleChange:  (newSchedule: any) => void;
  user?: UserData;
}

const UpdateData = ({ userData, handleInputChange, handleSubmit,handleScheduleChange, user }: UpdateDataProps) => {

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">
          <InputLabel label={'Email'} type={'email'} name={'email'} value={userData.email} id={'email'} onChange={handleInputChange} />

          <InputLabel label={'Name'} type={'text'} name={'name'} value={userData.name} id={'name'} onChange={handleInputChange} />

          <InputLabel label={'Fist Username'} type={'text'} name={'firstSurname'} value={userData.firstSurname} id={'firstSurname'} onChange={handleInputChange} />

          <InputLabel label={'Second Username'} type={'text'} name={'secondSurname'} value={userData.secondSurname} id={'secondSurname'} onChange={handleInputChange} />

          <InputLabel label={'Cedula'} type={'number'} name={'cedula'} value={userData.cedula} id={'cedula'} onChange={handleInputChange} />

          <InputLabel label={'Phone number'} type={'number'} name={'phoneNumber'} value={userData.phoneNumber} id={'phoneNumber'} onChange={handleInputChange} />

          <InputLabel label={'Boss'} type={'text'} name={'boss'} value={userData.boss} id={'boss'} onChange={handleInputChange} />

          <InputLabel label={'Salary'} type={'text'} name={'salary'} value={userData.salary} id={'salary'} onChange={handleInputChange} />

          <InputLabel label={'Department'} type={'text'} name={'idDepartment'} value={userData.idDepartment} id={'idDepartment'} onChange={handleInputChange} />


          <button type="submit" className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            UpDate
          </button>
        </div>
      </form>

      <Schedule schedule={userData.schedule}  handleScheduleChange={handleScheduleChange} />

    </div>
  );
};

export default UpdateData;
