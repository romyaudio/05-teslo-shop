import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import React, { use, useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts'
import useSWR from 'swr'
import { IUser } from '../../interfaces'
import { tesloApi } from '../../api'

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users')
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (data) {
            setUsers(data)
        }



    }, [data])


    if (!data && !error) return (<></>)

    const onRoleUpdate = async (userId: string, newRole: string) => {
        const previewUsers = users.map(user => ({ ...user }))
        const updateUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))

        try {
            await tesloApi.put('/admin/users', {
                userId: userId,
                role: newRole
            })
            setUsers(updateUsers)
        } catch (error) {
            setUsers(previewUsers)
            console.log(error)
        }
    }


    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre complet', width: 300 },
        {
            field: 'role',
            headerName: 'Role',
            width: 300,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Select
                        value={row.role}
                        label='Role'
                        onChange={({ target }) => onRoleUpdate(row.id, target.value)}
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin'>admin</MenuItem>
                        <MenuItem value='client'>client</MenuItem>
                        <MenuItem value='super-user'>super-user</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                )
            }
        },
    ]

    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))
    return (
        <AdminLayout title={'Users'} subTitle={'Mantenimiento de usuario'} icon={<PeopleOutline />}>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        loading={rows.length < 0}

                    />

                </Grid>

            </Grid>

        </AdminLayout>
    )
}

export default UsersPage