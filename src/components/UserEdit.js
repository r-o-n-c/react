import React, { useState, useEffect } from 'react';
import {Redirect, useParams, Route, useHistory } from "react-router-dom"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from './TextField';

const getData = async (userId, token, callback) => {
    const Response = await fetch(`/api/v2/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    });
    const data = await Response.json();
    callback(data.users);
};

const updateData = async (userId, body, token) => {
    const Response = await fetch(`/api/v2/users/${userId}`, {
        method: 'PATCH',
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

export const UserEdit = () => {
    const { userId } = useParams()
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        getData(userId, token, setUser);
    }, [token]);
    console.log(user)
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
                updateData(userId, values, token);
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
                                <TextField label="Email" placeholder={user.email} name="email" type="email" />
                                <TextField label="First name" placeholder={user.first_name} name="first_name" type="text" />
                                <TextField label="Last name" placeholder={user.last_name} name="last_name" type="text" />
                                <TextField label="Jobs count" placeholder={user.jobs_count} name="jobs_count" type="text" />
                                <TextField label="Active" placeholder={`${user.active}`} name="active" type="text" />
                                <TextField label="Slack username" placeholder={user.slack_username} name="slack_username" type="text" />
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
