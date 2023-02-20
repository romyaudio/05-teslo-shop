import { ErrorOutline } from "@mui/icons-material";
import { Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { set } from "mongoose";

import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form"

import { AuthLayout } from "../../components/layouts"
import { AuthContext } from "../../context";
import { validations } from "../../utils";

type FormData = {
  name:string
  email:string
  password:string
}
 

const RegisterPage = () => {

  const router = useRouter()

  const {registerUser} = useContext(AuthContext)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const [showError,setShowError] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')


   const onRegisteUser = async({name,email,password}:FormData)=>{

    setShowError(false)

    const {hasError,message} = await registerUser(name,email,password)
      
    if (hasError) {
      setShowError(true)
      setErrorMessage(message!)
      setTimeout(() => setShowError(false), 3000);
      return
    }
    router.replace('/')

   }

  return (
    <AuthLayout title={"Crear cuenta"}>
       <form onSubmit={handleSubmit(onRegisteUser)}>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
             <Grid item xs={12}>
               <Typography variant="h1" component='h1'>Crear cuenta</Typography>
               <Chip
                label='No se puede crear el usuario'
                color="error"
                className='fadeIn'
                icon={<ErrorOutline/>}
                sx={{display: showError ? 'flex' : 'none'}}
               />
             </Grid>

             <Grid item xs={12}>
               <TextField 
               label='Nombre' 
               variant="filled" 
               fullWidth
               {...register('name',{
                required:'Este campo es requerido',
                minLength:{value:2,message:'El nombre debe de tener 2 catactere'}
               })}
               error={!!errors.name}
               helperText={errors.name
                ?.message}
               />
             </Grid>

             <Grid item xs={12}>
               <TextField 
               type='email'
               label='Correo' 
               variant="filled" 
               fullWidth
               {...register('email',{
                required:'Este campo es requerido',
                validate:validations.isEmail
               })}
               error={!!errors.email}
               helperText={errors.email?.message
              }
               />
             </Grid>

             <Grid item xs={12}>
               <TextField 
               label='Contrasena' 
               type='password' 
               variant="filled" 
               fullWidth
               {...register('password',{
                required:'Este campo es requerido',
                minLength:{value:6,message:'Minimo 6 caracteres'}
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
               />
             </Grid>

             <Grid item xs={12}>
               <Button color="secondary" fullWidth size="large" type='submit'>
                 Registrar
               </Button>
             </Grid>

             <Grid item xs={12} display='flex' justifyContent="end">
               <NextLink href='/auth/login' passHref legacyBehavior>
                <Link underline="always">
                Ya tiene cuenta? 
                </Link>

               </NextLink>
             </Grid>
            </Grid>

        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage