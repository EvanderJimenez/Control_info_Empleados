import { Department, Employee } from "@/root/interface/departments";
import React, { useState } from "react";

interface ContentProps {
  content: Department;
  onEditEmployee: (employeeName: string, updatedEmployee: Employee) => void;
  onDeleteEmployee: (employeeName: string) => void;
}

export default function Content({
  onDeleteEmployee,
  onEditEmployee,
  ...props
}: ContentProps) {
  const { content } = props;
  const employees: Employee[] = Object.values(content.employees);
  const [editingEmployee, setEditingEmployee] = useState<string | null>(null);
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState<Employee>({
    name: "",
    des: "",
    imageE: "",
    documents: {},
  });

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee.name);
    setUpdatedEmployeeData(employee);
  };

  const handleSaveClick = () => {
    onEditEmployee(editingEmployee!, { ...updatedEmployeeData });
    setEditingEmployee(null);
  };

  const handleCancelClick = () => {
    setEditingEmployee(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  };

  return (
    <div>
      {employees.map((employee) => (
        <tr key={employee.name}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <img
                  className="w-full h-full rounded-full"
                  src={employee.imageE}
                  alt=""
                />
              </div>
              <div className="ml-3">
                {editingEmployee === employee.name ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={updatedEmployeeData.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="des"
                      value={updatedEmployeeData.des}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.name}
                    </p>
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.des}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </td>

          <td>
            {editingEmployee === employee.name ? (
              <>
                <button onClick={handleSaveClick}>Guardar</button>
                <button onClick={handleCancelClick}>Cancelar</button>
              </>
            ) : (
              <button onClick={() => handleEditClick(employee)}>Editar</button>
            )}
            <button onClick={() => onDeleteEmployee(employee.name)}>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </div>
  );
}
