import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import { Formik, Form } from 'formik';
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

export const UserEdit = () => {
    const { userId } = useParams()
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('token');

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
            onSubmit={(values) => {
                
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
