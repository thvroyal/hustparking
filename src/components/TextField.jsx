import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorStyle = {
    fontSize: ".8rem",
    color: "red",
    padding: "10px 0px 0px 10px",
    textAlign: "left",
  };
  return (
    <div>
      <label htmlFor={field.name} />
      <input
        className={`form-control form-control-user ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} style={errorStyle} />
    </div>
  );
};
