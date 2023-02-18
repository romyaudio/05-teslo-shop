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