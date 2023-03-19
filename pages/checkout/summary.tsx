import NextLInk from 'next/link'
import { Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'



const SummaryPage = () => {

  const router = useRouter()

  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)

  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!Cookies.get('FistName')) {
      router.push('/checkout/address')
    }
  }, [router])

  const onCreateOrder = async () => {
    setIsPosting(true)
    const { hasError, message } = await createOrder()
    if (hasError) {
      setErrorMessage(message)
      setIsPosting(false)
      return
    }
    router.replace(`/orders/${message}`)
  }


  if (!shippingAddress) {
    return <></>
  }
  const { FistName, LastName, address, address2 = '', zipCode, city, country, phone } = shippingAddress
  return (
    <ShopLayout title="Resumen de orden" pageDescription="resumen de la orden">
      <Typography variant="h1" component='h1'>Resumen de la orden</Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen de la orden ({numberOfItems})</Typography>
              <Divider sx={{ my: 1 }} />

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

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLInk href='/cart' legacyBehavior passHref>
                  <Link underline='always'>
                    Editar
                  </Link>
                </NextLInk>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  disabled={isPosting}
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                >
                  Confimar orden
                </Button>

                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 3 }}
                  variant='outlined'
                />

              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage