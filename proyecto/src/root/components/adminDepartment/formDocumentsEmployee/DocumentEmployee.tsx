import React from "react";

export const FormDocumentEmployee = () => {
  return (
    <form id="documents-form" className="mt-4">
      <div className="mb-1">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Type Documents:
        </label>
        <input
          type="text"
          id="type"
          name="type"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-1">
        <label
          htmlFor="documents"
          className="block text-gray-700 font-bold mb-2"
        >
          Documents:
        </label>
        <input
          type="file"
          id="documents"
          name="documents"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          multiple
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >
        Add Documents
      </button>
    </form>
  );
};
