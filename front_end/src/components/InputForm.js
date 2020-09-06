import React from "react";

export default function InputForm({
  name,
  labelName,
  inputValue,
  type,
  handleChange,
}) {
  return (
    <>
      <label htmlFor={name}>{labelName}</label>
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
      />
    </>
  );
}
