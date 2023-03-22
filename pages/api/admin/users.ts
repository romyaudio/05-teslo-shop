import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { use } from 'react'
import { db } from '../../../database'
import { IUser } from '../../../interfaces'
import { User } from '../../../models'

type Data =
    | { message: string }
    | IUser[]


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case "GET":
            return getUsers(req, res)

        case "PUT":
            return updateUsers(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect()
    const users = await User.find().select('-password').lean()
    await db.disconnect()

    return res.status(200).json(users)
}

async function updateUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { userId = '', role = '' } = req.body

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'No existe usuario por ese id' })
    }

    const validRole = ['admin', 'client', 'super-user', 'SEO']

    if (!validRole.includes(role)) {
        return res.status(400).json({ message: 'Role no permitido' + validRole.join(',') })
    }

    await db.connect()
    const user = await User.findById(userId)


    if (!user) {
        return res.status(400).json({ message: 'No existe usuario' })
        await db.disconnect()
    }

    user!.role = role
    await user!.save()
    await db.disconnect()

    return res.status(200).json({ message: 'Userio autualizado correctamente' })

}

