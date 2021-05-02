import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export const Login = () => {
  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        fetch('/api/v2/users/tokens', {
          method: 'POST',
          body: JSON.stringify(values),
        }).then((response) => {
          localStorage.setItem('token', response.headers.get('authorization'));
        });
      }}
    >
      {(formik) => (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-5">
              <div>
                <h1 className="my-4.font-weight-bold-display-4">Login</h1>
                <Form>
                  <TextField label="Email" name="email" type="email" />
                  <TextField label="password" name="password" type="password" />
                  <button className="btn btn-dark mt-3" type="submit" disabled={!formik.isValid}>
                    Login
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};