import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React from 'react'
import useSWR from 'swr'
import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 230 },
    { field: 'email', headerName: 'Correo', width: 230 },
    { field: 'name', headerName: 'Nombre completo', width: 230 },
    { field: 'total', headerName: 'Total', width: 100 },
    {
        field: 'isPaid',
        headerName: 'Pagada',
        width: 130,
        renderCell: ({ row }: GridRenderCellParams) => {
            return row.isPaid
                ? (<Chip variant='outlined' label="Pagada" color='success' />)
                : (<Chip variant='outlined' label="No pagada" color='error' />)
        }
    },
    { field: 'noProducts', headerName: 'No.Productos', width: 150, align: 'center' },
    {
        field: 'check',
        headerName: 'Ver Order',
        width: 100,
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a href={`/admin/orders/${row.id}`} target='_blank' rel="noreferrer" >
                    Ver order
                </a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Creada en ', width: 150 },
]

const Orders = () => {


    const { data, error } = useSWR<IOrder[]>('/api//admin/orders')
    if (!data && !error) return <></>

    const rows = data!.map((order) => (
        {
            id: order._id,
            email: (order.user as IUser).email,
            name: (order.user as IUser).name,
            total: order.total,
            isPaid: order.isPaid,
            noProducts: order.numberOfItems,
            createdAt: order.createdAt

        }
    ))

    return (
        <AdminLayout
            title={'Ordenes'}
            subTitle={'Mantenimientos de la ordenes'}
            icon={<ConfirmationNumberOutlined />}
        >

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        loading={rows.length === 0}

                    />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default Orders