import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import NextLink from 'next/link';
import { AuthLayout } from "../../components/layouts"


const RegisterPage = () => {
  return (
    <AuthLayout title={"Crear cuenta"}>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
             <Grid item xs={12}>
               <Typography variant="h1" component='h1'>Crear cuenta</Typography>
             </Grid>

             <Grid item xs={12}>
               <TextField label='Nombre' variant="filled" fullWidth/>
             </Grid>

             <Grid item xs={12}>
               <TextField label='Correo' variant="filled" fullWidth/>
             </Grid>

             <Grid item xs={12}>
               <TextField label='Contrasena' type='password' variant="filled" fullWidth/>
             </Grid>

             <Grid item xs={12}>
               <Button color="secondary" fullWidth size="large">
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

    </AuthLayout>
  )
}

export default RegisterPage