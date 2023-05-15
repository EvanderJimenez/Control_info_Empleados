import { Brands } from "@/root/interface/brands";
import { useEffect, useState } from "react";

const SearchBrands = () => {
  const [data, setData] = useState<Brands[]>([]);
  const [userData, setUserData] = useState<Brands>({
    idEmployee: "",
    cycle: {},
  });

  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => setData(data));
    console.log(data);
  }, []);
  return (
    <div>
      {" "}
      {data.map((item) => (
        <div
          key={item.idEmployee}
          className="p-6 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 text-center "
        >
          <p className="font-bold">Name Department: {item.idEmployee}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchBrands;
