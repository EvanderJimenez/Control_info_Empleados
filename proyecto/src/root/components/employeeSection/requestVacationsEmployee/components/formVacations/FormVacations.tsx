import React from "react";
import toast from "react-hot-toast";

interface FormVacations {
  handleVacationRequestSend: (event: React.FormEvent<HTMLFormElement>) => void;
  newDateStart: string;
  setNewDateStart: React.Dispatch<React.SetStateAction<string>>;
  newDateEnd: string;
  setNewDateEnd: React.Dispatch<React.SetStateAction<string>>;
  newDescription: string;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
}

const FormVacations = ({
  handleVacationRequestSend,
  newDateStart,
  setNewDateStart,
  setNewName,
  newName,
  setNewDescription,
  newDescription,
  setNewDateEnd,
  newDateEnd,
}: FormVacations) => {
  return (
    <>

      <form className="ml-6 mb-2" onSubmit={handleVacationRequestSend}>
        <div className="flex flex-col  md:w-full sm:w-full">
          <h2 className="text-lg sm:text-xl  text-darkBlue font-medium text-center mb-2">
            Vacation request
          </h2>
          <div className="items-center">
            <label className="font-semibold">Affair: </label>
            <input
              className="w-1/4 focus:outline-none "
              type="text"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className="w-auto flex justify-between lx:flex-row space-x-2 mt-5 items-center">
            <label className = "font-semibold" htmlFor="dateStar">Start date:</label>
            <input
              className="bg-white"
              type="datetime-local"
              id="dateStar"
              value={newDateStart}
              onChange={(e) => setNewDateStart(e.target.value)}
            />
            <label className = "font-semibold"  htmlFor="dateEnd">Final date:</label>
            <input
              type="datetime-local"
              id="dateEnd"
              value={newDateEnd}
              onChange={(e) => setNewDateEnd(e.target.value)}
            />
          </div>

          <textarea
            name="description"
            id="description"
            placeholder="Vacation request information"
            cols={29}
            rows={10}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="mt-3 shadow-lg focus:outline-none font-semibold"
          ></textarea>
          <div className="flex justify-center w-full"><button
            className=" bg-darkBlue zoom w-auto mt-3 "
            type="submit"
          >
            Send request
          </button></div>
          
        </div>
      </form>
    </>
  );
};

export default FormVacations;
