import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"

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

export const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        getData(userId, token, setUser);
    }, [token]);

    return (
        <div>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <p>Jobs count: {user.jobs_count}</p>
            <p>Active: {`${user.active}`}</p>
            <p>Slack username: {user.slack_username}</p>
        </div>
    )
}
