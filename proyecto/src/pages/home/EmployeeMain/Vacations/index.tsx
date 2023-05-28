import React from 'react'
import EmployeeMain from "@/Layout/EmployeePage";
import RequestVacationsEmployee from '@/root/components/employeeSection/requestVacationsEmployee/RequestVacationsEmployee';

export default function index (){
  return (
    <EmployeeMain>
   <RequestVacationsEmployee />
  </EmployeeMain>
  )
}


