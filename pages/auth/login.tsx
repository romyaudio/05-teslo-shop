import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import NextLink from "next/link"
import { AuthLayout } from "../../components/layouts"


const LoginPage = () => {
  return (
    <AuthLayout title={"Ingresar"}>
        <Box sx={{width:350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
             <Grid item xs={12}>
               <Typography variant="h1" component='h1'>Inicial Sesion</Typography>
             </Grid>

             <Grid item xs={12}>
               <TextField label='Correo' variant="filled" fullWidth/>
             </Grid>

             <Grid item xs={12}>
               <TextField label='Contrasena' type='password' variant="filled" fullWidth/>
             </Grid>

             <Grid item xs={12}>
               <Button color="secondary" fullWidth size="large">
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

    </AuthLayout>
  )
}

export default LoginPage