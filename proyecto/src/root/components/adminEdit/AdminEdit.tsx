import { useState } from "react";
import RegisterFormEmployee from "./formEmployee/RegisterFormEmployee";
import { UserData } from "@/root/interface/employee";
import { SearchDepartment } from "../adminDepartment/SearchDepartment";
interface RegisterProps {
  usersData: UserData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGetUsers: (id: string) => void;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}
function AdminEdit({ usersData, handleInputChange, handleGetUsers, handleUpdate, ...props }: RegisterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [selectedRow, setSelectedRow] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Guardar:", selectedRow);
  };

  return (
    <div>
      <div>
        <SearchDepartment handleGet={handleGetUsers} />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
        <div className="relative m-3 flex flex-wrap mx-auto justify-center">
          <div className="min-w-[340px]flex flex-col group">
            <div className="h-48 md:h-56 lg:h-[24rem] w-full bg-red-500 border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/departamentosdb.appspot.com/o/imageEmployee%2F49e9630a-6eb4-4a9b-addb-d91672dd6071?alt=media&token=74e4062d-f7e3-44f3-afa2-d9ab23e36ad6"
                className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
                alt=""
              />

              <div className="absolute z-10 border-4 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500"></div>
            </div>
            <a className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1">Name</a>

            <p className="mb-4 font-light  text-sm md:text-sm text-center text-gray-400">List Employee</p>

            <div className="flex justify-center gap-x-3">
              <button
                className="px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold"
                onClick={toggleDropdown}
              >
                Edit
              </button>
              <button className="px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 p-4 bg-gray-900 rounded">
          {selectedRow && (
            <div>
              <div className="flex flex-col justify-center items-center h-[100vh]">
                <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                  <div className="mt-2 mb-8 w-full">
                    <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">General Information</h4>
                    <p className="mt-2 px-2 text-base text-gray-600">CrHome's team of employees is comprised of highly trained professionals committed to providing an exceptional experience</p>
                  </div>
                  <RegisterFormEmployee handleInputChange={handleInputChange} userData={usersData} upDate={handleUpdate} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminEdit;
