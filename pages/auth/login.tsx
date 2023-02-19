import { useForm } from "react-hook-form"
import { ErrorOutline } from "@mui/icons-material"
import { Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import NextLink from "next/link"
import { useState } from "react"
import { tesloApi } from "../../api"
import { AuthLayout } from "../../components/layouts"
import { validations } from "../../utils"

type FormData = {
  email: string,
  password: string,
};
const LoginPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const [showError, setShowError] = useState(false)
   
  const onLoginUser = async({email,password}:FormData)=>{

     setShowError(false)
      try {
        
        const {data} = await tesloApi.post('/user/login',{email,password})
        const {token,user}=data
        console.log({token,user})
      } catch (error) {
        console.log('error en la credenciales')
        setShowError(true)
        setTimeout(() => setShowError(false), 3000);
      }
  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
             <Grid item xs={12}>
               <Typography variant="h1" component='h1'>Inicial Sesion</Typography>
               <Chip
                 label="No reconocemos ese usuario o contrasena"
                 color="error"
                 icon={<ErrorOutline/>}
                 className='fadeIn'
                 sx={{display: showError ? 'flex-1' : 'none'}}
                 
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
               <Button color="secondary" fullWidth size="large" type="submit">
                 Ingresar 
               </Button>
             </Grid>

             <Grid item xs={12} display='flex' justifyContent="end">
               <NextLink href='/auth/register' passHref legacyBehavior>
                <Link underline="always">
                No tiene cuenta? 
                </Link>

               </NextLink>
             </Grid>
            </Grid>

        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage