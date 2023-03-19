import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart';
import { currency } from '../../utils';

interface Props {
  orderValue?: {
    numberOfItems: number,
    subTotal: number,
    tax: number,
    total: number
  }
}


export const OrderSummary: FC<Props> = ({ orderValue }) => {

  const { numberOfItems, subTotal, tax, total } = useContext(CartContext)

  const summaryValues = orderValue ? orderValue : { numberOfItems, subTotal, tax, total }

  return (
    <Grid container>
      <Grid xs={6}>
        <Typography>No. product</Typography>
      </Grid>
      <Grid xs={6} display='flex' justifyContent='end'>
        <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? "Productos" : "Producto"}</Typography>
      </Grid>

      <Grid xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>

      <Grid xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>

      <Grid xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
        <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
      </Grid>



    </Grid>


  )
}
