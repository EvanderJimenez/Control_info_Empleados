import React from 'react'
import Filters from './components/filters/Filters'
import ListRequestVacations from './components/listRequest/ListRequestVacations'

const VacationsRequestBoss = () => {
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
        <div>

        </div>
    </div>
  )
}

export default VacationsRequestBoss