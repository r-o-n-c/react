import React from 'react'
import { ErrorMessage, useField } from 'formik';

export const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-2">
            <div className="row justify-content-start">
                <div className="d-inline-flex p-2">
                    <label htmlFor={field.name}>{label}</label>
                </div>
                <div className="d-inline-flex p-2 mt-1">
                    <ErrorMessage name={field.name} component="div" className="error" />
                </div>
            </div>
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            />
        </div>
    )
}
