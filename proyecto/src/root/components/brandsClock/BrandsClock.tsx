import React, { ChangeEvent, useEffect, useState } from "react";
import Clock from "./brandsEmployee/clock/Clock";
import { LoginEP } from "@/root/interface/employee";
import { useDispatch, useSelector } from "react-redux";
import { RootState, StartLogin, selectLogin } from "@/root/redux";
interface methodsBrands {
  handleUpdate: () => void;
}
export function BrandsClock({ handleUpdate, ...props }: methodsBrands) {
  const [time, setTime] = useState("");
  const loginState = useSelector(selectLogin);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      const currentTime =
        formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

      setTime(currentTime);
    };

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const [data, setData] = useState<LoginEP>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (data.email && data.password) {
      dispatch(StartLogin(data.email, data.password));
    }
  };
  useEffect(() => {
    if (loginState && loginState.uid) {
    }
  }, [loginState]);

  return (
    <div>
      <Clock
        time={time}
        handleSubmit={handleLogin}
        handleInputChange={handleInputChange}
        loginData={data}
      />
    </div>
  );
}
