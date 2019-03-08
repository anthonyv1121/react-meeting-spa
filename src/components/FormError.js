import React from "react";

const FormError = ({ errors }) => {
  return (
    <div className="col-12 alert alert-danger px-3">
      {errors.map((err, i) => {
        return <p key={`${err}-${i}`}>{err}</p>;
      })}
    </div>
  );
};

export default FormError;
