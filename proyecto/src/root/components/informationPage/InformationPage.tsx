import React from "react";
import { InformationPage } from "@/root/interface/employee";

const InformationPage = (props: InformationPage) => {
    return (
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-baseline">
          <div className="text-black text-center">
            <h1 className="text-4xl font-bold">{props.title}</h1>
            <p className="text-lg">{props.paragraph}</p>
          </div>
        </div>
        <img
          className="h-screen w-screen object-cover"
          src={props.img}
          alt="Primary image"
        />
      </div>
    );
  }

export default InformationPage;
