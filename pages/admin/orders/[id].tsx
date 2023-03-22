
import { Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CartList, OrderSummary } from "../../../components/cart"
import { AdminLayout } from "../../../components/layouts"
import { AirplaneTicketRounded, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { GetServerSideProps, NextPage } from 'next'
import { getOrderById } from '../../../database/dbOrders'
import { IOrder } from '../../../interfaces'

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    return (
        <AdminLayout
            title="Resumen de la  orden"
            subTitle={`Orden: ${order._id}`}
            icon={<AirplaneTicketRounded />}
        >


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
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </AdminLayout>
    )
}

export default OrderPage


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query

    const order = await getOrderById(id.toString())
    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
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