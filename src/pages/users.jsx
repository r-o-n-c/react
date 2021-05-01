import { JsonWebTokenError } from 'jsonwebtoken';
import React, {useState} from 'react'

function Users() {
    const token = '123abc456def789ghi'; //temporary
    const [user, setUser] = useState(null);
    fetch('/api/v2/users',
        {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
        .then(Response => Response.json())
        .then(data => setUser(data))
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-5">
                    {JSON.stringify(user)}
                </div>
            </div>
        </div>
    )
}

export default Users;