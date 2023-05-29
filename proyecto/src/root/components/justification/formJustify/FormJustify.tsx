import React from "react";
interface justify {
  handleSubmitAttendance: (event: React.FormEvent<HTMLFormElement>) => void;
  justify: string;
  setJustify: React.Dispatch<React.SetStateAction<string>>;
}
const FormJustify = ({
  handleSubmitAttendance,
  justify,
  setJustify,
  ...props
}: justify) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl py-2 px-2">
        ATTENDANCE
      </h2>
      <form
        className="w-full max-w-lg px-4 py-6 bg-gray-100 rounded-lg shadow-md"
        onSubmit={handleSubmitAttendance}
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Justification
          </label>
          <textarea
            className="w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 h-40 resize-none"
            id="message"
            value={justify}
            onChange={(event) => setJustify(event.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue hover:bg-teal focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Completed
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormJustify;
