import { Promise } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Order, Product, User } from '../../../models'

type Data = {
    numberOfOrders: number
    paidOrders: number
    notPaidOrders: number
    numberOfClients: number
    numberOfProducts: number
    productsWithNoInventory: number
    lowInventory: number
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect()


    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([

        Order.countDocuments(),
        Order.countDocuments({ 'isPaid': true }),
        User.countDocuments({ 'role': 'client' }),
        Product.countDocuments(),
        Product.countDocuments({ 'inStock': 0 }),
        Product.countDocuments({ 'inStock': { $lte: 10 } }),


    ])
    await db.disconnect()

    res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: (numberOfOrders - paidOrders),

    })
}