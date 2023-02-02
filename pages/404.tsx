import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ShopLayout } from "../components/layouts"


const Custom404 = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="no hay nada quemostra aqui">

        <Box
         display={'flex'}
          justifyContent='center' 
          alignItems={'center'} 
          height='calc(100vh - 200px)' 
          sx={{flexDirection: {xs:'column',md:'row'}}}
          >
            <Typography variant="h1" component={'h1'} fontSize={80} fontWeight={400}>404 |</Typography>
            <Typography marginLeft={2}>Pagina no encontrada</Typography>

        </Box>

    </ShopLayout>
  )
}

export default Custom404