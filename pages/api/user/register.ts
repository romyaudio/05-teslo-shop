import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs'
import { jwt } from '../../../utils'
type Data = 
|{message: string}
|{
    token:string
    user:{
        email:string
        role:string
        name:string
    }
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req,res)
            
          
    
        default:
           res.status(400).json({
            message:"Bad request"
        })
    }
}

const  registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {email = '',password ='',name=''} = req.body

   

   if(password.length < 6 ){
    return res.status(400).json({
        message:'La contrasena debe tener 6 caracteres'
    })
   }
   if(name.length < 2 ){
    return res.status(400).json({
        message:'El nombre debe tener 2 caracteres'
    })
   }

   await db.connect()
   const user = await User.findOne({email})

   if(user){
     await db.disconnect()
     return res.status(400).json({
        message: 'Este correo ya esta registrado'
     })
   }


  const newUser = new User({
    email:email.toLocaleLowerCase(),
    password:bcrypt.hashSync(password),
    role:'client',
    name,
  })

  try {
    await newUser.save({validateBeforeSave:true})
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:'Revisar log del servidor'
    })
  }

 

  const {_id,role} = newUser
  const token = jwt.singToken(_id,email)

  return res.status(200).json({
     token,
     user:{
        name,
        role,
        email
     }
  })
}
