import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';

export default function CheckboxField({ label, ...props }) {
  const [field, meta] = useField(props);
  const errorStyle = {
    fontSize: '.8rem',
    color: 'red',
    padding: '10px 0px 0px 10px',
    textAlign: 'left',
  };
  return (
    <div className="form-check form-check-inline">
      <input
        className={`form-check-input ${
          meta.touched && meta.error && 'is-invalid'
        }`}
        type="checkbox"
        {...field}
        {...props}
      />
      <label htmlFor={field.name} className="form-check-label ml-1">
        {label}
      </label>
      <ErrorMessage component="div" name={field.name} style={errorStyle} />
    </div>
  );
}

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
};
