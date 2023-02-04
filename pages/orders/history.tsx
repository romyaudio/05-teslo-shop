
import NextLink from 'next/link'
import { Grid, Typography,Chip,Link } from '@mui/material'
import { DataGrid,GridColDef,GridRenderCellParams } from '@mui/x-data-grid'


import { ShopLayout } from '../../components/layouts'

const columns: GridColDef[] = [
  {field:'id',headerName: 'ID' ,width:100},
  {field:'fullname',headerName: 'Nombre Completo' ,width:300},

  {
    field:'paid',
    headerName:"Pagada",
    description:"Mostrar informacion si esta pagada",
    width:200,
    renderCell:(params:GridRenderCellParams)=>{
      return (
        params.row.paid
        ? <Chip color='success' label='Pagada' variant='outlined'/>
        : <Chip color='error' label='No Pagada' variant='outlined'/>
      )
    }

  },
  {
    field:'orden',
    headerName:"ver orden",
    width:200,
    sortable:false,
    renderCell:(params:GridRenderCellParams)=>{
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline='always'>
             ver orden
          </Link>

        </NextLink>
      )
    }

  }
]

const rows = [
  {id: 1, paid:true,fullname: 'Romy Rodriguez'},
  {id: 2, paid:true,fullname: 'Glennys Torres'},
  {id: 3, paid:true,fullname: 'Mathiws Torres'},
  {id: 4, paid:false,fullname: 'Rafael Frias'},
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de order del cliemte'}>
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

       <Grid container>
        <Grid item xs={12} sx={{height:650,width:"100%"}}>
          <DataGrid
            rows={rows}
            columns= {columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          
          />

        </Grid>

       </Grid>
    </ShopLayout>
  )
}

export default HistoryPage