
import { EmployeesType } from "@/root/types/Employee.type";
import React,{useRef, useState} from "react";

interface ImageProfileProps {
    userData: EmployeesType;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ImageEmployee = ({userData,handleSubmit}: ImageProfileProps) => {

    const [profileUrl, setProfileUrl] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(null);

    const handleOnChangeProfileImage = (event: React.FormEvent<HTMLFormElement>) => {}



  return (
    <div>
      <div>
        <h2>Edit Profile Info</h2>
        <div className="bg-blue">
          <div>
            <img src="" alt="Imagen Profile" width={100} />
          </div>
          <div>
            <button className="btn" >
              Choose new profile picture
            </button>
            <input

              type="file"
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEmployee;
