import React, { useEffect, useContext, useState } from "react";


export default function Form({ children, submitButton, handleSubmit }) {
  return (
    <>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="btn-primary">
            {" "}
            {submitButton}{" "}
          </button>
        </form>
      </div>
    </>
  );
}
