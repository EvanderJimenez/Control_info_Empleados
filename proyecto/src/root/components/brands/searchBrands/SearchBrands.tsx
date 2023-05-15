import { Brands } from "@/root/interface/brands";
import { useEffect, useState } from "react";

const SearchBrands = () => {
  const [data, setData] = useState<Brands[]>([]);
  const [brandsData, setBrandsData] = useState<Brands>({
    idEmployee: "",
    cycle: {},
  });

  useEffect(() => {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div className="p-6 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 text-center">
          <p className="font-bold">IDEmployee: {item.idEmployee}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchBrands;
