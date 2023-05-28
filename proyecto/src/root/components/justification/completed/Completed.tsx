import React from "react";
interface completed {
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function Completed({ handleUpdate, ...props }: completed) {
  return <div> </div>;
}
