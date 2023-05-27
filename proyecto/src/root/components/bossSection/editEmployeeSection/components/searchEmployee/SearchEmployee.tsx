import SearchInput from '@/root/components/ui/searchInput/SearchInput'
import { StartGetByVariable } from '@/root/redux'
import React from 'react'
import { useDispatch } from 'react-redux'

interface PropsSearch{
    cedula: string
    name: string
    jobPosition: string

}

const SearchEmployee = ({cedula,name,jobPosition}:PropsSearch) => {

    const dispatch = useDispatch();

  const handleSearch = async() => {

    

   // dispatch(StartGetByVariable(valueEnd,typeList));

  }

  return (
    <div>
            <div className="flex flex-col mb-3">
            <h2>filters: </h2>
            <SearchInput labelInputSeekerOne="text" valueEnd={cedula} placeholderSeekerOne="Cedula" typeList="cedula" id="cedula" />
            <SearchInput labelInputSeekerOne="text" valueEnd={name} placeholderSeekerOne="Name" typeList="name" id="name" />
            <SearchInput labelInputSeekerOne="text" valueEnd={jobPosition} placeholderSeekerOne="Job Position" typeList="jobPosition" id="jobPosition" />

            <button onClick={handleSearch} className="bg-red flex justify-center" >
            {" "}
            <img src="/Images/searchIcon.png" alt="" />
          </button>
          </div>
    </div>
  )
}

export default SearchEmployee