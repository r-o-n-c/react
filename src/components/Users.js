import React, { useState, useMemo } from 'react'
import { Formik } from 'formik';
import { useTable } from 'react-table';

export const Users = () => {
    const token = '123abc456def789ghi'; //temporary
    const [users, setUsers] = useState(null);

    const getData = async () => {
        const Response = await fetch('/api/v2/users',
            {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            })
        const data = await Response.json();
        setUsers(data.users)
    }
    getData();

    table
    const Columns = [
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Jobs Count',
            accessor: 'jobs_count'
        },
        {
            Header: 'Active',
            accessor: 'active'
        }
    ]

    const columns = useMemo(() => Columns, [])
    const data = useMemo(() => users, [])

    // console.log("users", users)
    // console.log("data", data)

    const tableInstance = useTable({
        columns,
        data
    })

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return (
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
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
    //table
    // return (
    //     <div>
    //         <Formik>
    //             {formik => (
    //                 <div className="container mt-3">
    //                     <div className="row">
    //                         <div className="col-md-5">
    //                             {JSON.stringify(users)}
    //                         </div>
    //                     </div>
    //                 </div>
    //             )}
    //         </Formik>
    //     </div>
    // )
}
