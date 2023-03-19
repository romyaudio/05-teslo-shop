
import NextLink from 'next/link'
import { Grid, Typography, Chip, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { GetServerSideProps, NextPage } from 'next'


import { ShopLayout } from '../../components/layouts'
import { getSession } from 'next-auth/react'
import { dbOrders } from '../../database'
import { IOrder } from '../../interfaces'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

  {
    field: 'paid',
    headerName: "Pagada",
    description: "Mostrar informacion si esta pagada",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagada' variant='outlined' />
          : <Chip color='error' label='No Pagada' variant='outlined' />
      )
    }

  },
  {
    field: 'orden',
    headerName: "ver orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.idOrder}`} passHref legacyBehavior>
          <Link underline='always'>
            ver orden
          </Link>

        </NextLink>
      )
    }

  }
]


interface Props {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {


  const rows = orders.map((order, index) => (
    {
      id: index + 1,
      paid: order.isPaid,
      fullname: order.shippingAddress.FistName + ' ' + order.shippingAddress.LastName,
      idOrder: order._id

    }
  ))

  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de order del cliemte'}>
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}

          />

        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: 'auth/login?p=/orders/history',
        permanent: false
      }
    }
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id)

  return {
    props: {
      orders
    }
  }
}