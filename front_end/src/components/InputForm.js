import React from "react";

export default function InputForm({
  pattern,
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
        pattern={pattern}
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
      />
    </>
  );
}
