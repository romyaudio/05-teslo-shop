import { Password } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import NextLink from "next/link"
import { useForm } from "react-hook-form"
import { AuthLayout } from "../../components/layouts"
import { validations } from "../../utils"

type FormData = {
  email: string,
  Password: string,
};
const LoginPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
   
  const onLoginUser =(data:FormData)=>{
    console.log({data})
  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
             <Grid item xs={12}>
               <Typography variant="h1" component='h1'>Inicial Sesion</Typography>
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
               {...register('Password',{
                 required:'Este campo es requerido',
                 minLength:{value:6,message:'Minimo 6 caracteres'}
               })}
               error={!!errors.Password}
               helperText={errors.Password?.message}
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