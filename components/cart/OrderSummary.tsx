import { Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid xs={6}>
        <Typography>No. product</Typography>
      </Grid>
      <Grid xs={6} display='flex' justifyContent='end'>
        <Typography>3</Typography>
      </Grid>

      <Grid xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid xs={6} display='flex' justifyContent='end'>
        <Typography>$200.89</Typography>
      </Grid>

      <Grid xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>
      <Grid xs={6} display='flex' justifyContent='end'>
        <Typography>$30.89</Typography>
      </Grid>

      <Grid xs={6}sx={{mt:2}}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
        <Typography variant="subtitle1">$230.89</Typography>
      </Grid>

      

    </Grid>
    
    
  )
}
