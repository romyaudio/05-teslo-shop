import Typography from "@mui/material/Typography";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks"

const MenPage = () => {
    const {products,isLoading,isError} = useProducts('/products?gender=men')
    return (
      <ShopLayout title={"Hombres"} pageDescription={"Todo lo que busca para hombres"}>
          <Typography variant="h1" component='h1'>Hombres</Typography>
          <Typography variant="h2" sx={{mb:1}}>Todos para Hombres</Typography>

          {
          isLoading
           ? <FullScreenLoading/>
           : <ProductList products={products} />
        }
  
      </ShopLayout>
    )
  }
  
  export default MenPage