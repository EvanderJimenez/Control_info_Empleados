import React from "react";
import InputDepartment from "../../input/InputDepartment";
interface documents {
  handleSubmitDocuments: (event: React.FormEvent<HTMLFormElement>) => void;
  newDocuments: string;
  setNewDocuments: React.Dispatch<React.SetStateAction<string>>;
}
const AddDocuments = ({
  handleSubmitDocuments,
  newDocuments,
  setNewDocuments,
  ...porps
}: documents) => {
  return (
    <div className="w-full bg-grey-500">
      <div className="container mx-auto py-8">
        <div className="w-96 mx-auto bg-white rounded shadow">
          <form
            className="mx-auto mt-16 max-w-xl sm:mt-20 border border-blue rounded"
            onSubmit={handleSubmitDocuments}
          >
            <h1 className="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-grey-500">
              Add Documents for Department
            </h1>
            <div className="py-4 px-8">
              <InputDepartment
                label={" Document Name:"}
                type={"text"}
                name={"newDocuments"}
                value={newDocuments}
                id={"newDocuments"}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setNewDocuments(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="documents" className="mr-2 font-bold">
                Upload Document:
              </label>
              <input type="file" />
            </div>
            <div className="mb-4">
              <button
                className="bg-[#049473] cmb-2 mx-16 rounded-full px-10"
                type="submit"
              >
                Save Documents
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocuments;
