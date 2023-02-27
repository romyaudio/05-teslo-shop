

import Typography from "@mui/material/Typography";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";
import { useProducts } from "../hooks";





export default function Home() {

const {products,isLoading,isError} = useProducts('/products')

  return (
    <ShopLayout title="Teslo-Shop - Home" pageDescription={"Encuetra los mejores productos de teslo shop aqui"}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>

        {
          isLoading
            ? <FullScreenLoading/>
            : <ProductList products={products} />
        }

    </ShopLayout>
  )
}
