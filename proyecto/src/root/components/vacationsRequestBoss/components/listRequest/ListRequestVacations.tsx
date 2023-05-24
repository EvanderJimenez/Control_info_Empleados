import { selectGetEmployeesByIdDepartment, selectLogin } from '@/root/redux/selectors/employee-selector/employee.selector';
import { StarGetEmployeesByIdDepartment } from '@/root/redux/thunks/employee-thunk/employee.thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface PendingRequest {
  employeeName: string;
  employeeUID: string;
  dateStart: string;
  dateEnd: string;
  description: string;
}

const ListRequestVacations: React.FC = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const listEmployees = useSelector(selectGetEmployeesByIdDepartment);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);

  useEffect(() => {
    dispatch(StarGetEmployeesByIdDepartment(loginState?.idDepartment || ''));
  }, []);

  useEffect(() => {
    if (listEmployees) {

      console.log("Listing employees: " + listEmployees)
      console.log("Uid: " +loginState?.uid)

      const pendingRequestsList: PendingRequest[] = [];

      listEmployees.forEach((employee) => {
        const employeeName: string = employee.name;
        const employeeUID: string = employee.uid;
        const vacations = employee.vacations;

        if (vacations) {
          Object.entries(vacations).forEach(([key, value]) => {
            const { approved, dateEnd, dateStart, description } = value;

            if (!approved) {
              const pendingRequest: PendingRequest = {
                employeeName,
                employeeUID,
                dateStart,
                dateEnd,
                description,
              };
              pendingRequestsList.push(pendingRequest);
            }
          });
        }
      });

      setPendingRequests(pendingRequestsList);
    }
  }, [listEmployees]);

  return (
    <div>
      {pendingRequests.map((request: PendingRequest, index: number) => (
        <div key={index}>
          <h3>Employee: {request.employeeName}</h3>
          <p>Descripción: {request.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListRequestVacations;
