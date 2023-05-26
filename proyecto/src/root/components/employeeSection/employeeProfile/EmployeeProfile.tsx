import React from 'react'
import InputForm from '../../brands/InputForm'
import { useSelector } from 'react-redux';
import { selectLogin } from '@/root/redux/selectors/employee-selector/employee.selector';

const EmployeeProfile = () => {

    const UserLogin = useSelector(selectLogin);

  return (
   <>
   <div className=' bg-darkBlue items-center justify-center p-3 h-screen'>

    <div className='flex  items-center justify-center'>
    <img
      src="/Images/userIcon.png"
      width={100}
      height={100}
      alt="Picture of the author"
    />
    </div>

    <div className='flex flex-wrap justify-center p-3 m-3'>

    <div className='p-4 m-3'>
    <InputForm label='Name' name='name' onChange={() => {} } type='text' value={UserLogin?.name || ""} />
        <InputForm label='Surname' name='' onChange={() => {} } type='text' value={UserLogin?.firstSurname || ""} />
        <InputForm label='Second Sername' name='' onChange={() => {} } type='text' value={UserLogin?.secondSurname || ""} />
        <InputForm label='Cedula' name='' onChange={() => {} } type='text' value={UserLogin?.cedula || ""} />
    </div>
    <div className='p-4 m-3'>
    <InputForm label='Email' name='' onChange={() => {} } type='text' value={UserLogin?.email || ""} />
        <InputForm label='Phone Number' name='' onChange={() => {} } type='text' value={UserLogin?.phoneNumber || ""} />
        <InputForm label='Job Position' name='' onChange={() => {} } type='text' value={UserLogin?.jobPosition || ""} />
        <InputForm label='Salary' name='' onChange={() => {} } type='text' value={UserLogin?.salary || ""} />
    </div>

    </div>

   </div>
   </>
  )
}

export default EmployeeProfile