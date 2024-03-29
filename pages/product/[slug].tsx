import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

import React, { useContext, useState } from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductSlideShow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { getAllProductSlugs, getProductBySlug } from '../../database/dbProducts'
import { ICartProduct, IProduct, ISize } from '../../interfaces'

interface Props {
  product: IProduct

}

const ProductPage: NextPage<Props> = ({ product }) => {

  const route = useRouter()

  const { addProductToCart } = useContext(CartContext)

  const [temCartProduct, setTemCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    inStock: product.inStock,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const selectedSize = (size: ISize) => {
    setTemCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTemCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {

    if (!temCartProduct.size) { return }

    addProductToCart(temCartProduct)
    route.push('/cart')
  }


  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          {/* slideshow */}
          <ProductSlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>


            {/* titles */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>${product.price}</Typography>


            {/* cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                currentValue={temCartProduct.quantity}
                maxValue={product.inStock}
                updateQuantity={onUpdateQuantity}
              />
              <SizeSelector
                //  selectedSize={product.sizes[3]} 
                sizes={product.sizes}
                selectedSize={temCartProduct.size}
                onSelectedSize={selectedSize}

              />
            </Box>

            {/* Agregar al carrito */}

            {
              product.inStock > 0
                ? <Button color='secondary' className='circular-btn' onClick={onAddProduct}>
                  {temCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'

                  }
                </Button>
                : <Chip label='No hay disponibles' color='error' variant='outlined' />
            }





            {/* description */}

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>

        </Grid>

      </Grid>

    </ShopLayout>
  )
}

export default ProductPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


//* no usar eso SSR



// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const { slug =''} = params as {slug:string}

//   const product = await getProductBySlug(slug)

//   if(!product){
//     return {
//       redirect:{
//         destination:'/',
//         permanent:false
//       }
//     }
//   }

//   return {
//     props: { product

//     }
//   }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const getProductSlugs = await getAllProductSlugs() // your fetch function here 

  return {
    paths: getProductSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),

    fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { } from 'next'
import { useRouter } from 'next/router'
import { CartContext } from '../../context'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }

  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product, revalidate: 60 * 60 * 24

    }
  }


}