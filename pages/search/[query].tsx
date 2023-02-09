import { GetServerSideProps, NextPage } from 'next';

import { Box, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { getProductsByTerm, getAllProducts } from '../../database/dbProducts';
import { IProduct } from '../../interfaces/products';
import { color } from '@mui/system';

interface Props {
  products : IProduct[]
  foundProducts:boolean
  query:string
}

const SearchPage:NextPage<Props> = ({products,foundProducts,query}) => {
    
    return (
        <ShopLayout title="Teslo-Shop - Search" pageDescription={"Encuetra los mejores productos de teslo shop aqui"}>
           <Typography variant="h1" component='h1'>Buscar productos</Typography>

           {
              foundProducts 
               ? <Typography variant="h2" sx={{mb:1}} textTransform='capitalize'>Termino: {query}</Typography>
               : 
               <Box display='flex'>
                 <Typography variant="h2" sx={{mb:1}}>No encontromos ningun producto</Typography>
                 <Typography variant="h2" sx={{ml:1}}color='secondary' textTransform='capitalize'>( {query} )</Typography>
               </Box>
               
               
           }
           
     
          
                <ProductList products={products} />
             
     
          
        </ShopLayout>
       )
}

export default SearchPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { query='' } = params as {query:string}

  if(query.length === 0){
    return {
      redirect:{
        destination:'/',
        permanent:true
      }
    }
  }

  let products = await getProductsByTerm(query)
  const foundProducts = products.length > 0
  // TODO recomendar otros productos
  if(!foundProducts){
    products = await getAllProducts()
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}