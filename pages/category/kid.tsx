import Typography from "@mui/material/Typography";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks"




const KidPage = () => {

    const {products,isLoading,isError} = useProducts('/products?gender=kid')
  return (
    <ShopLayout title={"Ninos"} pageDescription={"Todo lo que busca para tus ninos"}>
        <Typography variant="h1" component='h1'>Ninos</Typography>
        <Typography variant="h2" sx={{mb:1}}>Todos para ninos</Typography>

        {
          isLoading
           ? <FullScreenLoading/>
           : <ProductList products={products} />
        }

    </ShopLayout>
  )
}

export default KidPage