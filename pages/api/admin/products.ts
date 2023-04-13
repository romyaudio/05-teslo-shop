import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL || '')

type Data =
    | { message: string }
    | IProduct[]
    | IProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        case 'POST':
            return createProducts(req, res)
        case 'PUT':
            return updateProducts(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' })
    }




}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect()
    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean()
    await db.disconnect()

    // TODO
    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })
        return product
    })

    res.status(200).json(updatedProducts)


}
async function createProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { images = [] } = req.body as IProduct

    if (images.length < 2) {
        return res.status(400).json({ message: 'Es necesario al meno 2 imágenes' })
    }

    // TODO 

    try {

        await db.connect()

        const productDB = await Product.findOne({ slug: req.body.slug })
        if (productDB) {
            return res.status(400).json({ message: 'Este producto ya existe' })
            await db.disconnect()
        }


        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)

    } catch (error) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({ message: "Revisar la consola del servidor " })
    }
}

async function updateProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { _id = '', images = [] } = req.body as IProduct

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del producto no es valido' })
    }

    if (images.length < 2) {
        return res.status(400).json({ message: 'Es necesario al meno 2 imágenes' })
    }

    // TODO:

    try {


        await db.connect()

        const product = await Product.findById(_id)
        if (!product) {
            return res.status(400).json({ message: 'No hay productos con ese id' })
            await db.disconnect()
        }

        //TODO 
        product.images.forEach(async (image) => {
            if (!images.includes(image)) {
                const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
                console.log(image, fileId, extension)
                await cloudinary.uploader.destroy(fileId)
            }
        })

        await product.update(req.body)
        await product.save()

        await db.disconnect()


        res.status(200).json(product)

    } catch (error) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({ message: "Revisar la consola del servidor " })



    }
}

