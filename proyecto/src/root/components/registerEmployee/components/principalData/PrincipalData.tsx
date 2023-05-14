import React from 'react'
import { UserData } from '@/root/interface/employee'
import InputLabel from '../inputLabel/InputLabel';
import Schedule from '../schedule/Schedule';

interface RegisterProps {
    userData: UserData;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleScheduleChange:  (newSchedule: any) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    user?: UserData;
}

const PrincipalData = ({ userData, handleInputChange,handleScheduleChange, handleSubmit, user }: RegisterProps) => {

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="bg-SecondaryColor flex items-center justify-center flex-col h-full w-full p-10">

                    <InputLabel label={"Email"} type={"email"} name={"email"} value={userData.email} id={"email"} onChange={handleInputChange} />

                    <InputLabel label={"Password"} type={"password"} name={"password"} value={userData.password} id={"password"} onChange={handleInputChange} />

                    <InputLabel label={"Name"} type={"text"} name={"name"} value={userData.name} id={"name"} onChange={handleInputChange} />

                    <InputLabel label={"Fist Username"} type={"text"} name={"firstSurname"} value={userData.firstSurname} id={"firstSurname"} onChange={handleInputChange} />

                    <InputLabel label={"Second Username"} type={"text"} name={"secondSurname"} value={userData.secondSurname} id={"secondSurname"} onChange={handleInputChange} />

                    <InputLabel label={"Cedula"} type={"number"} name={"cedula"} value={userData.cedula} id={"cedula"} onChange={handleInputChange} />

                    <InputLabel label={"Phone number"} type={"number"} name={"phoneNumber"} value={userData.phoneNumber} id={"phoneNumber"} onChange={handleInputChange} />

                    <button type="submit" className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </div>
            </form>
            {/* <Schedule schedule={userData.schedule}  handleScheduleChange={handleScheduleChange} /> */}
        </div>
    )
}

export default PrincipalData
