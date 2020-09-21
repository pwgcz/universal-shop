import React from "react";
import ImageBackground from '../components/ImageBackground';


export default function Form ({ children, submitButton, handleSubmit }) {
  return (
    <ImageBackground>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="btn-primary">
            {submitButton}
          </button>
        </form>
      </div>
    </ImageBackground>
  );
}
