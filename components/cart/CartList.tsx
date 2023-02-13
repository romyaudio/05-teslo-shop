import NextLink from 'next/link'
import { FC, useContext } from 'react';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import { ItemCounter } from '../ui'
import { CartContext } from '../../context';
import Product from '../../models/Product';
import { ICartProduct } from '../../interfaces';




interface Props {
    editable?:boolean
}

export const CartList:FC<Props> = ({editable = false}) => {

  const {cart,updateCartQuantity}=useContext(CartContext)

  const onUpdateCartQuantity =(Product:ICartProduct,newQuantityValue:number)=>{

    Product.quantity = newQuantityValue
    updateCartQuantity(Product)

  }



  return (
    <>
      {
        cart.map(product =>(
            <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
                <Grid item xs={3}>
                    {/* llevar a pagina del producto */}
                    <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                        <Link>
                         <CardActionArea>
                            <CardMedia
                              image={`/products/${product.image}`}
                              component='img'
                              sx={{borderRadius:'5px'}}
                            />
                         </CardActionArea>
                        </Link>

                    </NextLink>

                </Grid>
                <Grid item xs={7}>
                    <Box display='flex' flexDirection='column'>
                      <Typography variant='body1'>{product.title}</Typography>
                      <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>

                      
                      
                      {
                        editable
                        ? <ItemCounter 
                        currentValue={product.quantity} 
                        maxValue={product.inStock} 
                        updateQuantity={ (value) =>onUpdateCartQuantity(product,value) }/>
                        : <Typography variant='h6'>{product.quantity} {product.quantity >1 ? "productos" : "producto"}</Typography>
                      }

                     
                    </Box>

                </Grid>
                <Grid item xs={2} display='flex' flexDirection='column' alignItems='center'>
                    <Typography variant='subtitle1'>${product.price}</Typography>

                    {
                        editable && (
                        <Button variant='text' color='secondary'>
                          Remover
                        </Button>
                        )
                    }

                    

                </Grid>

            </Grid>

        ))
      }
    </>
  )
}
