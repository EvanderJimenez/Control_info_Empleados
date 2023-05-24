import LoginPage from "@/Layout/LoginPage";
import MethodsDepartments from "@/root/components/adminDepartment/methods/MethodsDepartments";
import { BrandsEmployee } from "@/root/components/brandsClock/brandsEmployee/BrandsEmployee";
import RegisterBrand from "@/root/components/brandsClock/registerBrands/RegisterBrand";
import ScheduleTimeSelection from "@/root/components/editSchedulePage/ScheduleTimeSelection";
import MainForm from "@/root/components/mainForm/MainForm";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  const handleScheduleChange = (schedules: Schedule[]) => {
    console.log(schedules);
  };

  return (
    <LoginPage>
      <BrandsEmployee />
    </LoginPage>
  );
}
