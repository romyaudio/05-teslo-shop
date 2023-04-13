import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SummaryTitle } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'
import { IDashboard } from '../../interfaces'
import useSWR from 'swr'



const DashboardPage = () => {

    const { data, error, isLoading } = useSWR<IDashboard>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(30)

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
        }, 1000)

        return () => clearInterval(interval)
    }, [])


    if (!error && !data) {
        return <></>
    }

    if (error) {
        console.log(error)
        return <Typography>Error al cargar la data</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders
    } = data!

    return (
        <AdminLayout title={'Dashboard'} subTitle={'Estadística generales '} icon={<DashboardOutlined />}>
            <Grid container spacing={3}>
                <SummaryTitle title={numberOfOrders} subTitle={'Ordenes totales'} icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />} />
                <SummaryTitle title={paidOrders} subTitle={'Ordenes pagadas'} icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />} />
                <SummaryTitle title={notPaidOrders} subTitle={'Ordenes pendientes'} icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />} />
                <SummaryTitle title={numberOfClients} subTitle={'Clientes'} icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />} />
                <SummaryTitle title={numberOfProducts} subTitle={'Productos'} icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />} />
                <SummaryTitle title={productsWithNoInventory} subTitle={'Productos sin existencias'} icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />} />
                <SummaryTitle title={lowInventory} subTitle={'Bajo inventario'} icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />} />
                <SummaryTitle title={refreshIn} subTitle={'Actualización en:'} icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />} />
            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage




