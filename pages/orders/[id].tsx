import NextLInk from 'next/link'
import { Backdrop, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import { CircleRounded, CreditCardOffOutlined, CreditScoreOutlined, Details } from '@mui/icons-material'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { db } from '../../database'
import { Order } from '../../models'
import { getOrderById } from '../../database/dbOrders'
import { IOrder } from '../../interfaces'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { tesloApi } from '../../api'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
  order: IOrder
}

type OrderResponseBody = {
  id: string
  status:
  | 'COMPLETED'
  | 'SAVED'
  | 'APPROVED'
  | 'VOIDED'
  | 'PAYER_ACTION_REQUIRED'
}

const OrderPage: NextPage<Props> = ({ order }) => {

  const router = useRouter()

  const [isPaying, setIsPaying] = useState(false)

  const orderCompleted = async (details: OrderResponseBody) => {

    if (details.status !== 'COMPLETED') {
      return alert('Oeder no completada')
    }
    setIsPaying(true)
    try {
      const { data } = await tesloApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id
      })

      router.reload()

    } catch (error) {
      setIsPaying(false)
      console.log(error)
      alert('Error')
    }
  }

  return (
    <ShopLayout title="Resumen de la  orden" pageDescription="resumen de la orden">
      <Typography variant="h1" component='h1'>Orden: {order._id}</Typography>

      {
        order.isPaid
          ? (
            <Chip
              sx={{ my: 2 }}
              label='Orden pagada'
              variant='outlined'
              color='success'
              icon={<CreditScoreOutlined />}
            />
          ) : (
            <Chip
              sx={{ my: 2 }}
              label='Pendiente de pago'
              variant='outlined'
              color='error'
              icon={<CreditCardOffOutlined />}
            />
          )
      }





      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen de la orden ({order.numberOfItems} {order.numberOfItems > 1 ? "Productos" : "Producto"})</Typography>
              <Divider sx={{ my: 1 }} />

              <Typography >{order.shippingAddress.FistName + " " + order.shippingAddress.LastName}</Typography>
              <Typography >{order.shippingAddress.address}</Typography>
              <Typography >{order.shippingAddress.city}</Typography>
              {/* <Typography >Md</Typography> */}
              <Typography >{order.shippingAddress.zipCode}</Typography>
              <Typography >{order.shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary orderValue={
                {
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total
                }
              } />

              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
                {/* TODO:  */}
                <Box>
                  <Backdrop open={isPaying} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                    <CircularProgress color="inherit" />

                  </Backdrop>
                </Box>
                {
                  order.isPaid
                    ? (
                      <Chip
                        sx={{ my: 2 }}
                        label='Orden pagada'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                      />
                    ) : (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: `${order.total}`,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {

                          return actions.order?.capture().then((details) => {

                            orderCompleted(details)
                            //console.log({ details })
                            //const name = details.payer.name?.given_name;
                            // alert(`Transaction completed by ${name}`);
                          });
                        }} />
                    )
                }
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default OrderPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const { id = '' } = query
  const session: any = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false

      }
    }
  }

  const order = await getOrderById(id.toString())
  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false

      }
    }
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false

      }
    }
  }

  return {
    props: {
      order
    }
  }
}