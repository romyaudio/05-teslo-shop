import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType = 
| {type: '[Cart] - LoadCart fro cookies | storage',payload:ICartProduct}
| {type: '[Cart] - Add Product',payload:ICartProduct}

export const cartReducer = (state:CartState,action:CartActionType):CartState =>{
    switch (action.type) {
        case '[Cart] - LoadCart fro cookies | storage':
            return {
                ...state,
                
            }
           
    
        default:
          return state
    }
}