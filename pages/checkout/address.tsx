import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { GetServerSideProps } from 'next'
import { jwt } from "../../utils"

   const AddressPage = () => {
   return (
      <ShopLayout title="Address" pageDescription="Confimar direccion de destino">
         <Typography variant="h1" component='h1'>Direccion</Typography>

            <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12}sm={6} >
               <TextField label='Nombre' variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField label='Apellido' variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField label='Direccion' variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField label='Direccion 2 (Opcional)' variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField label='Cuidad' variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField label='Codigo postal' variant="filled" fullWidth/>
            </Grid>
            <Grid item xs={12}sm={6}>
            <FormControl fullWidth> 
               <Select 
               variant="filled"
               value={1}
               >
            <MenuItem value={1}>Costa Rica</MenuItem>
               <MenuItem value={2}>Republica Dominicana</MenuItem>
               <MenuItem value={3}>Puerto Rico</MenuItem>
               <MenuItem value={4}>Mexico</MenuItem>
               </Select>
            </FormControl>
         </Grid>
         <Grid item xs={12}sm={6}>
            <TextField label='Telefono' variant="filled" fullWidth/>
         </Grid>
      </Grid>

      <Box sx={{mt:5}} display='flex' justifyContent='center'>
            <Button color='secondary' className="circular-btn" size='large'>
               Revisar pedido
            </Button>
      </Box>
      </ShopLayout>
   )
}

export default AddressPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//    const {token = ''} = req.cookies
   
//    let isValidToken = false

//    try {
//       await jwt.isValidToken(token)
//       isValidToken = true
//    } catch (error) {
//       isValidToken = false  
//    }

//    if(!isValidToken){
//       return{
//          redirect:{
//             destination:"/auth/login?p=/checkout/address",
//             permanent : false

//          }
//       }
//    }


//    return {
//       props: {
         
//       }
//    }
// }
