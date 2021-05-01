import React, { useState } from 'react'
import { Formik } from 'formik';

export const Users = () => {
    const token = '123abc456def789ghi'; //temporary
    const [users, setUsers] = useState(null);
    fetch('/api/v2/users',
        {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        .then(Response => Response.json())
        .then(data => setUsers(data))
    return (
        <div>
            <Formik>
                {formik => (
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-md-5">
                                {JSON.stringify(users)}
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
}
