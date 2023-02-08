import { Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const SearchPage = () => {
    const {products,isLoading,isError} = useProducts('/products')
    return (
        <ShopLayout title="Teslo-Shop - Search" pageDescription={"Encuetra los mejores productos de teslo shop aqui"}>
           <Typography variant="h1" component='h1'>Buscar productos</Typography>
           <Typography variant="h2" sx={{mb:1}}>ABC123...</Typography>
     
             {
               isLoading
                ? <FullScreenLoading/>
                : <ProductList products={products} />
             }
     
          
        </ShopLayout>
       )
}

export default SearchPage