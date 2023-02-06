import Typography from "@mui/material/Typography";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks"

const WomenPage = () => {
    const {products,isLoading,isError} = useProducts('/products?gender=women')
    return (
      <ShopLayout title={"Mujeres"} pageDescription={"Todo lo que busca para mejeres"}>
          <Typography variant="h1" component='h1'>Mujeres</Typography>
          <Typography variant="h2" sx={{mb:1}}>Todos para Mujeres</Typography>
          {
          isLoading
           ? <FullScreenLoading/>
           : <ProductList products={products} />
        }
  
      </ShopLayout>
    )
  }
  
  export default WomenPage