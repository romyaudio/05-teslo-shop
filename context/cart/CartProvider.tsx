import {FC ,PropsWithChildren,useEffect,useReducer} from 'react'
import { ICartProduct } from '../../interfaces'
import { CartContext,cartReducer } from './'
import Cookie from 'js-cookie'



export interface CartState {
    isLoaded:boolean
    cart: ICartProduct[];
    shippingAddress?:ShippingAddress
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total:number;
}

export interface ShippingAddress {
        FistName:string
        LastName:string
        address:string
        address2?:string
        city:string
        country:string
        zipCode:string
        phone:string
}

const CART_INITIAL_STATE : CartState = {
    isLoaded:false,
    cart:[],
    shippingAddress:undefined,
    numberOfItems: 0,
      subTotal: 0,
      tax: 0 ,
      total:0 
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
        if(Cookie.get('FistName')){
        const shippingAddress= {
            FistName:Cookie.get('FistName') || '',
            LastName:Cookie.get('LastName') || '',
            address:Cookie.get('address') || '',
            address2:Cookie.get('address2') || '',
            city:Cookie.get('city') || '',
            country:Cookie.get('country') || '',
            zipCode:Cookie.get('zipCode') || '',
            phone:Cookie.get('phone') || '',
        }
        dispatch({
            type: '[Cart] - LoadAddress From Cookies',
            payload: shippingAddress
        }) 
        }
        
    }, [])
    

    useEffect(() => {
        if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const numberOfItems=state.cart.reduce((prev,current)=> current.quantity + prev,0)
        const subTotal = state.cart.reduce((prev,current)=> (current.price * current.quantity ) + prev,0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const orderSummary ={
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate ,
            total:subTotal * (taxRate + 1 ) 
        }

        dispatch({type:'[Cart] - Update cart summary',payload:orderSummary})
        
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
   
    const updateCartQuantity = (product:ICartProduct)=>{
        dispatch({type:'[Cart] - Change cart quantity',payload:product})
    }
   
    const removeCartProduct=(product:ICartProduct)=>{
        dispatch({type:'[Cart] - Remove product in cart',payload:product})
    }

    const updateAddress = (address:ShippingAddress)=>{

        Cookie.set('FistName',address.FistName)
        Cookie.set('LastName',address.LastName)
        Cookie.set('address',address.address)
        Cookie.set('address2',address.address2 || '')
        Cookie.set('city',address.city)
        Cookie.set('country',address.country)
        Cookie.set('zipCode',address.zipCode)
        Cookie.set('phone',address.phone)

        dispatch({type:'[Cart] - Update address',payload:address})
    }
    return (
        <CartContext.Provider value={{
            ...state,
            // methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress
            
        }}>
        {children}
        </CartContext.Provider>
    )
}