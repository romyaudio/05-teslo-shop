
import jwt from "jsonwebtoken";


export const singToken = (_id:string,email:string)=>{
  if(!process.env.JWT_SECRET_SEED){
    throw new Error('No hay semilla JWT revisar variable de entorno')
  }

  return  jwt.sign(

    {_id,email},
    process.env.JWT_SECRET_SEED,
    {expiresIn:'30d',}

   )
}

export const isValidToken =(token:string):Promise<string>=>{
  if(!process.env.JWT_SECRET_SEED){
    throw new Error('No hay semilla JWT revisar variable de entorno')
  }

  return new Promise((resolve,rejects)=>{
    try {
      jwt.verify(token,process.env.JWT_SECRET_SEED || '',(err,payload)=>{
        
        if(err) return rejects('JWT no es valido')
        const {_id} = payload as {_id:string}
        resolve(_id)
      })
    } catch (error) {
      console.log(error)
      rejects('JWT no es valido')
    }
  })
}