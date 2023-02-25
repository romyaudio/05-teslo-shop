import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { GetServerSideProps } from 'next'
import { countries } from "../../utils/countries"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

type FormData = {
   FistName  :string
   LastName  :string
   address   :string
   address2? :string
   city      :string
   country   :string
   zipCode   :string
   phone     :string
}

   const AddressPage = () => {
   const router = useRouter()   

   const {register,handleSubmit,watch,formState:{errors}} = useForm<FormData>({
      defaultValues:{
      FistName:'',
      LastName:'',
      address:'',
      address2:'',
      city:'',
      country:'',
      zipCode:'',
      phone:'',
      }
      
   })

   const onSubmitAddress = (data:FormData) => {
      console.log({data})
      Cookies.set('FistName',data.FistName)
      Cookies.set('LastName',data.LastName)
      Cookies.set('address',data.address)
      Cookies.set('address2',data.address2 || '')
      Cookies.set('country',data.country)
      Cookies.set('zipCode',data.zipCode)
      Cookies.set('phone',data.phone)

      router.push('checkout/summary')
   }

   return (
      <ShopLayout title="Address" pageDescription="Confimar direccion de destino">
         <Typography variant="h1" component='h1'>Direccion</Typography>
         <form onSubmit={handleSubmit(onSubmitAddress)}>
            <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12}sm={6} >
               <TextField 
                  label='Nombre' 
                  variant="filled" 
                  fullWidth
                  {...register('FistName',
                        {required:'El campo es obligatorio'}
                  )}
                  error={!!errors.FistName}
                  helperText={errors.FistName?.message}
                  />
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField 
               label='Apellido' 
               variant="filled" 
               fullWidth
               {...register('LastName',
                        {required:'El campo es obligatorio'}
                  )}
                  error={!!errors.LastName}
                  helperText={errors.LastName?.message}
               />
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField 
               label='Direccion' 
               variant="filled" 
               fullWidth
               {...register('address',
                        {required:'El campo es obligatorio'}
                  )}
                  error={!!errors.address}
                  helperText={errors.address?.message}
               />
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField 
               label='Direccion 2 (Opcional)' 
               variant="filled" 
               fullWidth
               {...register('address2')}
                  error={!!errors.address}
                  helperText={errors.address?.message}
               />
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField 
               label='Cuidad' 
               variant="filled" 
               fullWidth
               {...register('city',
                        {required:'El campo es obligatorio'}
                  )}
                  error={!!errors.city}
                  helperText={errors.city?.message}
               />
            </Grid>
            <Grid item xs={12}sm={6}>
               <TextField 
               label='Codigo postal' 
               variant="filled" 
               fullWidth
               {...register('zipCode',
                        { required:'El campo es obligatorio'}
                  )}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
               />
            </Grid>
            <Grid item xs={12}sm={6}>
            <FormControl fullWidth> 
               <TextField
               select 
               variant="filled"
               defaultValue={countries[6].code}
               {...register('country',
                        { required:'El campo es obligatorio'}
                  )}
                  error={!!errors.country}
                  helperText={errors.country?.message}
               >
               {
               
                  countries.map(country =>(
                  <MenuItem
                  key={country.code} 
                  value={country.code}>
                  {country.name}
                  </MenuItem>

                  ) )
               
               }
               
               </TextField>
            </FormControl>
         </Grid>
         <Grid item xs={12}sm={6}>
            <TextField 
            label='Telefono' 
            variant="filled" 
            fullWidth
            {...register('phone',
                        {required:'El campo es obligatorio'}
                  )}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
            />
         </Grid>
         </Grid>

         <Box sx={{mt:5}} display='flex' justifyContent='center'>
            <Button color='secondary' className="circular-btn" size='large' type="submit">
               Revisar pedido
            </Button>
         </Box>
      </form>
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
