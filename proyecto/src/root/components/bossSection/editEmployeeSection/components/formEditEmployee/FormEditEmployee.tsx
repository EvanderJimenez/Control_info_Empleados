import ComboBoxDocuments from '@/root/components/employeeSection/documentsEmployee/components/comboBoxDocuments/ComboBoxDocuments'
import InputFloatLabel from '@/root/components/ui/InputFloatLabel/InputFloatLabel'
import { EmployeesType, Files } from '@/root/types/Employee.type';
import React from 'react'

interface FormEditEmployee{
    handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDismissEmployee:  ()  => void;
    handleClear: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    handleDownload:() => Promise<void>;

    dataEmployee: EmployeesType;
    setDataEmployee: React.Dispatch<React.SetStateAction<EmployeesType>>;
    selectOption: Files | null;
    setSelectOption: React.Dispatch<React.SetStateAction<Files | null>>;
    files: Files[];
}

const FormEditEmployee =React.memo( ({...props}:FormEditEmployee) => {
  return (
    <>
            <div className="w-full md:w-1/2 lg:flex-grow xl:flex-grow px-2 py-2 pb-14">
          <form
            onSubmit={props.handleUpdate}
            className="bg-lithBlue bg-opacity-50 shadow-lg p-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Name"
                  id="Name"
                  onChange={props.handleInputChange}
                  name="name"
                  type="text"
                  value={props.dataEmployee.name}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Cedula"
                  id="cedula"
                  onChange={props.handleInputChange}
                  name="cedula"
                  type="text"
                  value={props.dataEmployee.cedula}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Surname"
                  id="firstSurname"
                  onChange={props.handleInputChange}
                  name="firstSurname"
                  type="text"
                  value={props.dataEmployee.firstSurname}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Second surname"
                  id="SecondSurname"
                  onChange={props.handleInputChange}
                  name="secondSurname"
                  type="text"
                  value={props.dataEmployee.secondSurname}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Job position"
                  id="JobPosition"
                  onChange={props.handleInputChange}
                  name="jobPosition"
                  type="text"
                  value={props.dataEmployee.jobPosition}
                />
              </div>
              <div className="flex flex-col">
                <InputFloatLabel
                  labelFloat="Phone Number"
                  id="PhoneNumber"
                  onChange={props.handleInputChange}
                  name="phoneNumber"
                  type="number"
                  value={props.dataEmployee.phoneNumber.toString()}
                />
              </div>
              <div className="flex flex-col col-span-2">
                <InputFloatLabel
                  labelFloat="Salary"
                  id="salary"
                  onChange={props.handleInputChange}
                  name="salary"
                  type="text"
                  value={props.dataEmployee.salary.toString()}
                />
              </div>
            </div>
            <div className=" pt-3 space-x-4 flex justify-between">
              <button
                onClick={props.handleDismissEmployee}
                className="bg-darkBlue hover:border-red hover:rounded-lg focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Dismiss
              </button>

              <button
                type="submit"
                className="bg-darkBlue focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-56 sm:w-auto px-5 py-2.5 text-center "
              >
                Save
              </button>
              <button
                onClick={props.handleClear}
                className="bg-darkBlue   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Clear
              </button>
            </div>
          </form>
          <div className=" flex flex-row justify-center items-center">
            <ComboBoxDocuments
              label="Documents of employee"
              selectedOption={props.selectOption}
              setSelectedOption={props.setSelectOption}
              items={props.files}
            />
            {props.selectOption ? (
              <div className="flex flex-col m-5">
                <label className="font-semibold">
                  Name: {props.selectOption.name}
                </label>
                <button
                  className="bg-darkBlue font-semibold"
                  onClick={props.handleDownload}
                >
                  Download file 📃
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
    </>
  )
})

export default FormEditEmployee