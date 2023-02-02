

import Typography from "@mui/material/Typography";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { initialData } from "../database/products";





export default function Home() {
  return (
   <ShopLayout title="Teslo-Shop - Home" pageDescription={"Encuetra los mejores productos de teslo shop aqui"}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>

     <ProductList products={initialData.products as any} />
   </ShopLayout>
  )
}
