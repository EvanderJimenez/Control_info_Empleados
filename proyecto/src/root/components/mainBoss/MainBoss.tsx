import React, { useState } from "react";
import ListEmployee from "../listEmployee/ListEmployee";

export const MainBoss = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full primary-font">
      <div className="GridThreeColumns">
        <div className="bg-PrimaryColor">
        </div>
        <div className="bg-SecondaryColor w-full h-full ">
          <section className="h-screen">Center</section>
        </div>
        <div className="bg-PrimaryColor">Hi rigth</div>
      </div>
    </div>
  );
};

export default MainBoss;
