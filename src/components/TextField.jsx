import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';

export default function TextField({ label, showLabel, ...props }) {
  const [field, meta] = useField(props);
  const errorStyle = {
    fontSize: '.8rem',
    color: 'red',
    padding: '10px 0px 0px 10px',
    textAlign: 'left',
  };
  return (
    <div className={showLabel ? 'mb-3' : ''}>
      <label htmlFor={field.name} className="text-uppercase text-primary small ml-3">{showLabel ? label : ''}</label>
      <input
        className={`form-control form-control-user ${meta.touched && meta.error && 'is-invalid'}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} style={errorStyle} />
    </div>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
};
TextField.defaultProps = {
  showLabel: false,
};
