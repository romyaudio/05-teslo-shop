import { AddOutlined, CategoryOutlined } from '@mui/icons-material'
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import NextLink from 'next/link'
import React from 'react'
import useSWR from 'swr'
import { AdminLayout } from '../../components/layouts'
import { IProduct, } from '../../interfaces'

const columns: GridColDef[] = [

    {
        field: 'img',
        headerName: 'Imagen',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a href={`/product/${row.slug}`} target="_blank" rel='noreferrer'>
                    <CardMedia
                        component='img'
                        alt={row.title}
                        className='fadeIn'
                        image={row.img}
                    />
                </a>
            )
        }
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
                    <Link>{row.title}</Link>
                </NextLink>
            )
        }
    }
    ,
    { field: 'gender', headerName: 'Genero' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },

]

const Products = () => {


    const { data, error } = useSWR<IProduct[]>('/api//admin/products')
    if (!data && !error) return <></>

    const rows = data!.map((product) => (
        {
            id: product._id,
            img: product.images[0],
            title: product.title,
            gender: product.gender,
            type: product.type,
            inStock: product.inStock,
            price: product.price,
            sizes: product.sizes.join(', '),
            slug: product.slug,

        }
    ))

    return (
        <AdminLayout
            title={`Productos (${data?.length})`}
            subTitle={'Mantenimientos de la Productos'}
            icon={<CategoryOutlined />}
        >
            <Box display='flex' justifyContent='end' sx={{ mb: 2 }}    >
                <Button
                    startIcon={<AddOutlined />}
                    color='secondary'
                    href='/admin/products/new'

                >
                    Crear producto
                </Button>

            </Box>
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

export default Products