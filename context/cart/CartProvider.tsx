import {FC ,PropsWithChildren,useEffect,useReducer} from 'react'
import { ICartProduct } from '../../interfaces'
import { CartContext,cartReducer } from './'
import Cookie from 'js-cookie'

export interface CartState {
    cart: ICartProduct[]
}

const CART_INITIAL_STATE : CartState = {
    cart:[]
}

export const CartProvider:FC<PropsWithChildren> = ({children}) =>{
    const [state,dispatch] = useReducer(cartReducer,CART_INITIAL_STATE)


   useEffect(() => {

    try {
        const cookiesProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!):[]
        dispatch({type: '[Cart] - LoadCart from cookies | storage',payload:cookiesProducts})
    } catch (error) {
        dispatch({type: '[Cart] - LoadCart from cookies | storage',payload:[]})
    }

     
    
   }, [])
   

    useEffect(() => {
        if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])
    


    const addProductToCart =(product:ICartProduct)=>{

        const productInCart = state.cart.some(p => p._id === product._id)
         if(!productInCart) return dispatch({type:'[Cart] - Update products in cart',payload:[...state.cart,product]})

         const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
         if(!productInCartButDifferentSize) return dispatch({type:'[Cart] - Update products in cart',payload:[...state.cart,product]})

        //  Acumular
        const updateProducts = state.cart.map(p =>{
            if(p._id !== product._id)return p
            if(p.size !== product.size)return p
            //actualizar la catindad 
            p.quantity += product.quantity
            return p
        })

        dispatch({type:'[Cart] - Update products in cart',payload:updateProducts})
    }

   

    return (
        <CartContext.Provider value={{
            ...state,
            // methods
            addProductToCart,
            
        }}>
        {children}
        </CartContext.Provider>
    )
}