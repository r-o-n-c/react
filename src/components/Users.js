import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable, usePagination, useFilters } from 'react-table';
import { boolean } from 'yup/lib/locale';
import { ColumnFilter } from './ColumnFilter';

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

const deleteData = async (userId, token, callback, setUsers) => {
    const Response = await fetch(`/api/v2/users/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    });
    callback(token, setUsers);
};

const tableColumns = [
    {
        Header: 'ID',
        accessor: 'id',
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Email',
        accessor: 'email',
        Filter: ColumnFilter
    },
    {
        Header: 'Jobs Count',
        accessor: 'jobs_count',
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Active',
        accessor: 'active',
        Filter: ColumnFilter
    },
];

export const Users = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getData(token, setUsers);
    }, [token]);

    // localStorage.clear(); // for testing purpose
    // console.log(users);

    const data = useMemo(() => [...users], [users]);
    // console.log(data);
    const columns = useMemo(() => [...tableColumns], []);
    // console.log(columns);

    const tableInstance = useTable({ columns, data }, useFilters, usePagination );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setPageSize,
        prepareRow 
    } = tableInstance;
    const { pageIndex, pageSize } = state;
    
    return (
        <div>
            <h1>user index</h1>
            <Link to='/userCreate'>Create a user</Link>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}
                                <span>{column.canFilter ? column.render('Filter') : null}</span></th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{typeof(cell.value) === 'boolean' ? `${cell.value}` : cell.render('Cell')}</td>;
                                })}
                            <Link to={`/userDetails/${row.allCells[0].value}`}> View </Link>
                            <Link to={`/userEdit/${row.allCells[0].value}`}> Edit </Link>
                            <Link onClick={() => deleteData(row.allCells[0].value, token, getData, setUsers)}> Delete </Link>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={previousPage} disabled={!canPreviousPage}>{'<<'}</button>
                <span> Page <strong>{pageIndex + 1} of {pageOptions.length} </strong></span>
                <button onClick={nextPage} disabled={!canNextPage}>{'>>'}</button>
                <span> Page size: </span>
                <span>
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {
                            [3, 5, 10].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                    </select>
                </span>
            </div>
        </div>
    );
};