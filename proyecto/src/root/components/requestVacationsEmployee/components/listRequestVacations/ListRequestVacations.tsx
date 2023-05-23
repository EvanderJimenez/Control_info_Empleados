import { selectGetVacationsByUid, selectLogin } from '@/root/redux/selectors/employee-selector/employee.selector';
import { StarGetVacationsByUid } from '@/root/redux/thunks/employee-thunk/employee.thunk';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ListRequestVacations = () => {

    const employeesListVacations = useSelector(selectLogin);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(StarGetVacationsByUid(employeesListVacations?.uid || ''));
      }, [dispatch,employeesListVacations]);
  return (
 

<div className="grid grid-cols-1 p-4 gap-4  p-2vh max-h-screen scroll overflow-y-auto h-72 border-2 ">

    {
      employeesListVacations?.vacations ? (
      <>
      {
        <>
         {Object.entries(employeesListVacations.vacations).map(([name]) => (
          <div key={name}>
            <p className="font-bold"> Name Request: {name}</p>
            <p>Description: {employeesListVacations.vacations[name].description}</p>
            <p>Date Start: {employeesListVacations.vacations[name].dateStart}</p>
            <p>Date End: {employeesListVacations.vacations[name].dateEnd}</p>
            <p>State: {employeesListVacations.vacations[name].approved ? 'Accepted' : 'Denied' }</p>

          </div>
        ))}
        </>
      
      }
      </>) : <div> <h2>No Request</h2></div>
    }

    </div>


  )
}

export default ListRequestVacations