import React from 'react'
import Filters from './components/filters/Filters'
import ListRequestVacations from './components/listRequest/ListRequestVacations'
import { useSelector } from 'react-redux';
import { selectLogin } from '@/root/redux/selectors/employee-selector/employee.selector';

const VacationsRequestBoss = () => {

  const loginState = useSelector(selectLogin);

  return (
    <div>
        <div>
            <div>
                <h2>List Request</h2>
                <Filters />
            </div>
            <div>
                <ListRequestVacations />
            </div>
        </div>
        <div className='flex flex-col justify-center items-center'>

          <div className='flex flex-col'>
            <label className=''>{loginState?.name}</label>
            <label >Name Request: </label>
          </div>
          <div className='flex flex-row'>
            <label ></label>
          </div>
          
        </div>
    </div>
  )
}

export default VacationsRequestBoss