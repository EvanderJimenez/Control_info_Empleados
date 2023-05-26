import LoginPage from "@/Layout/LoginPage";
import MethodsDepartments from "@/root/components/adminDepartment/methods/MethodsDepartments";
import BrandsClock from "@/root/components/brandsClock/BrandsClock";
import { BrandsEmployee } from "@/root/components/brandsClock/brandsEmployee/BrandsEmployee";
import RegisterBrand from "@/root/components/brandsClock/registerBrands/RegisterBrand";
import ScheduleTimeSelection from "@/root/components/editSchedulePage/ScheduleTimeSelection";
import JustificationEmployee from "@/root/components/justification/JustificationEmployee";
import MainForm from "@/root/components/mainForm/MainForm";
import { Schedule } from "@/root/interface/employee";

export default function index() {
  const handleScheduleChange = (schedules: Schedule[]) => {
    console.log(schedules);
  };

  return (
    <LoginPage>
      <JustificationEmployee
        hIni={"3:00"}
        hFin={""}
        date={"2023-05-26"}
        uuid={"7QMS8GM2bVYxySW9PD2V3AGxGGJ3"}
      />
    </LoginPage>
  );
}
