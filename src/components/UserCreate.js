import React from 'react';
import { useHistory } from "react-router-dom"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField';

const addData = async (body, token) => {
    await fetch('/api/v2/users', {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: JSON.stringify(body)
    });
};

const validate = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    first_name: Yup.string()
        .min(3, 'First name must be at least 3 characters')
        .required('First name is required'),
    last_name: Yup.string()
        .min(3, 'Last name must be at least 3 characters')
        .required('Last name is required'),
    jobs_count: Yup.number()
        .positive()
        .integer()
        .required('Jobs count is required'),
    active: Yup.boolean(),
    slack_username: Yup.string()
})

export const UserCreate = () => {
    const token = localStorage.getItem('token');
    const history = useHistory();

    return (
        <Formik
            initialValues={{
                email: '',
                first_name: '',
                last_name: '',
                jobs_count: '',
                active: '',
                slack_username: ''
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                addData(values, token);
                history.push('/')
            }}
        >
            {(formik) => (
                <div className="container mt-3">
                <div className="row">
                    <div className="col-md-5">
                        <div>
                            <h1 className="my-4.font-weight-bold-display-4">Edit User</h1>
                            <Form>
                                <TextField label="Email" placeholder="example@example.com" name="email" type="email" />
                                <TextField label="First name" placeholder="John" name="first_name" type="text" />
                                <TextField label="Last name" placeholder="Smith" name="last_name" type="text" />
                                <TextField label="Jobs count" placeholder="5" name="jobs_count" type="text" />
                                <TextField label="Active" placeholder="true" name="active" type="text" />
                                <TextField label="Slack username" placeholder="JohnAtSlack" name="slack_username" type="text" />
                                <button className="btn btn-dark mt-3" type="submit" disabled={!formik.isValid}>
                                    Save
              </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </Formik>
    );
}
