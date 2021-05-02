import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

const getData = async (token, callback) => {
    const Response = await fetch('/api/v2/users', {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    });
    const data = await Response.json();
    callback(data.users);
};

const tableColumns = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Jobs Count',
        accessor: 'jobs_count',
    },
    {
        Header: 'Active',
        accessor: 'active',
    },
];

export const Users = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getData(token, setUsers);
    }, [token]);

    // console.log(users);

    const data = useMemo(() => [...users], [users]);
    // console.log(data);
    const columns = useMemo(() => [...tableColumns], []);
    // console.log(columns);

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return (
        <div>
            <h1>user index</h1>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            <Link to={`/userDetails/${row.allCells[0].value}`}>view</Link>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};