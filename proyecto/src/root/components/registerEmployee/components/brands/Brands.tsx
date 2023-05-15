import { Brands } from '@/root/interface/employee';
import React, { useState } from 'react';

interface BrandsProps{
    handleBrandsChange: (newBrands: Brands[]) => void;
}

const Brands = ({handleBrandsChange}: BrandsProps) => {
  const [formValues, setFormValues] = useState<Brands>({
    date: '',
    startTime: '',
    endTime: '',
    justification: '',
    finished: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormValues({ ...formValues, finished: checked });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBrand = [
        {
            date: formValues.date,
            startTime: formValues.startTime,
            endTime: formValues.endTime,
            justification: formValues.justification,
            finished: formValues.finished,
        }
    ]

    handleBrandsChange(newBrand)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4">
      <div className="my-2">
        <label htmlFor="date" className="block font-medium">Fecha:</label>
        <input type="date" id="date" name="date" value={formValues.date} onChange={handleInputChange} className="rounded-lg p-2 border-2 border-gray-300 w-full focus:outline-none focus:border-blue-500" />
      </div>
      <div className="my-2">
        <label htmlFor="startTime" className="block font-medium">Hora inicial:</label>
        <input type="time" id="startTime" name="startTime" value={formValues.startTime} onChange={handleInputChange} className="rounded-lg p-2 border-2 border-gray-300 w-full focus:outline-none focus:border-blue-500" />
      </div>
      <div className="my-2">
        <label htmlFor="endTime" className="block font-medium">Hora final:</label>
        <input type="time" id="endTime" name="endTime" value={formValues.endTime} onChange={handleInputChange} className="rounded-lg p-2 border-2 border-gray-300 w-full focus:outline-none focus:border-blue-500" />
      </div>
      <div className="my-2">
        <label htmlFor="justification" className="block font-medium">Justificación:</label>
        <textarea id="justification" name="justification" value={formValues.justification} onChange={handleInputChange} className="rounded-lg p-2 border-2 border-gray-300 w-full h-24 focus:outline-none focus:border-blue-500" />
      </div>
      <div className="my-2">
        <label htmlFor="completed" className="block font-medium">¿Terminado?</label>
        <input type="checkbox" id="completed" name="completed" checked={formValues.finished} onChange={handleCheckboxChange} className="rounded-lg p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enviar</button>
    </form>
  );
};

export default Brands;
