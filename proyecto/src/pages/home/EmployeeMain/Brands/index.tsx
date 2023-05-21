
import EmployeeMain from "@/Layout/EmployeePage";
import RegisterBrands from "@/root/components/brands/registerBrands/RegisterBrands";
import BrandsClock from "@/root/components/brandsClock/BrandsClock";
import React from "react";


export default function index() {
  return (
    <EmployeeMain>
        <BrandsClock/>
    </EmployeeMain>
  );
}
