import NextLInk from 'next/link'
import { Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { useContext, useEffect } from 'react'
import { CartContext } from '../../context'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'



const SummaryPage = () => {

  const router = useRouter()

  const {shippingAddress,numberOfItems} = useContext(CartContext)

  useEffect(() => {
    if(!Cookies.get('FistName')){
    router.push('/checkout/address')
    }
  }, [router])
  

  if(!shippingAddress){
    return <></>
  }
  const {FistName,LastName,address,address2 = '',zipCode,city,country,phone} = shippingAddress
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
                <Typography variant="h2">Resumen de la orden ({numberOfItems})</Typography>
                <Divider sx={{my:1}}/>

                <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                    <NextLInk href='/checkout/address' legacyBehavior passHref>
                        <Link underline='always'>
                         Editar
                        </Link>
                    </NextLInk>
                </Box>

                
                <Typography >{FistName} {LastName}</Typography>
                <Typography >{address}</Typography>
                <Typography >{city}</Typography>
                <Typography >Md</Typography>
                <Typography >{zipCode}</Typography>
                <Typography >{country}</Typography>
                <Typography >{phone}</Typography>

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