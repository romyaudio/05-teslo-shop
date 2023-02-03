import NextLInk from 'next/link'
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"


const SummaryPage = () => {
  return (
    <ShopLayout title="Resumen de orden" pageDescription="resumen de la orden">
       <Typography variant="h1" component='h1'>Resumen de la orden</Typography>

       <Grid container>
        <Grid item xs={12} sm={7}>
           <CartList/>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
                <Typography variant="h2">Resumen de la orden (3 Items)</Typography>
                <Divider sx={{my:1}}/>

                <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                    <NextLInk href='/checkout/address' legacyBehavior passHref>
                        <Link underline='always'>
                         Editar
                        </Link>
                    </NextLInk>
                </Box>

                
                <Typography >Romy Rodriguez</Typography>
                <Typography >500 Virginia Av</Typography>
                <Typography >Towson</Typography>
                <Typography >Md</Typography>
                <Typography >21286</Typography>
                <Typography >410-501-4324</Typography>

                <Divider sx={{my:1}}/>

                <Box display='flex' justifyContent='end'>
                    <NextLInk href='/cart' legacyBehavior passHref>
                        <Link underline='always'>
                         Editar
                        </Link>
                    </NextLInk>
                </Box>

                <OrderSummary/>

                <Box sx={{mt:3}}>
                    <Button color="secondary" className="circular-btn" fullWidth>
                       Confimar orden
                    </Button>

                </Box>
            </CardContent>
          </Card>
        </Grid>

       </Grid>
    </ShopLayout>
  )
}

export default SummaryPage