import axios from 'axios'
import Cookies from 'js-cookie'
import { useSession,signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import {FC ,PropsWithChildren,useEffect,useReducer} from 'react'
import { tesloApi } from '../../api'
import { IUser } from '../../interfaces'

import {AuthContext ,authReducer} from './'

export interface AuthState {
    isLoggedIn:boolean
    user?:IUser
}

const AUTH_INITIAL_STATE: AuthState ={
    isLoggedIn:false,
    user:undefined
}

export const AuthProvider:FC<PropsWithChildren>= ({children})=>{

    const [state,dispatch]= useReducer(authReducer,AUTH_INITIAL_STATE)

    const router = useRouter()

    const {data,status} = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            
            dispatch({type:'[AUTH] - Login',payload:data?.user as IUser})
        }
    
    }, [status,data])
    


    // useEffect(() => {
    //     checkToken()
    
    //     return () => {
        
    //     }
    // }, [])

    const checkToken = async() =>{
        if(!Cookies.get('token'))return
        try {
            const {data} = await tesloApi.get('/user/validete-token')

        const {token,user}=data

        Cookies.set('token',token)
        dispatch({type:'[AUTH] - Login',payload:user}) 

        } catch (error) {
            Cookies.remove('token')
        }
        
    }
    



    const loginUser = async(email:string,password:string):Promise<boolean>=>{
        try {
            const {data} = await tesloApi.post('/user/login',{email,password})

            const {token,user}=data

            Cookies.set('token',token)
            dispatch({type:'[AUTH] - Login',payload:user})
            return true

        } catch (error) {
        return false
        }
    }

    const registerUser = async (name:string,email:string,password:string):Promise<{hasError:boolean;message?:string}> => {

        try {

        const {data} = await tesloApi.post('/user/register',{name,email,password})

        const {token,user}=data

        Cookies.set('token',token)
        dispatch({type:'[AUTH] - Login',payload:user})
        return {
            hasError:false
        }
        
        } catch (error) {
            if(axios.isAxiosError(error)) {
            return {
                hasError:true,
                message:error.response?.data.message
                }
            }
            return {
            hasError:true,
            message: 'No se pudo crear el usario intente de nuevo'
        }
        } 
    }
    

    const logout =()=>{
        
        Cookies.remove('cart')
        Cookies.remove('FistName')
        Cookies.remove('LastName')
        Cookies.remove('address')
        Cookies.remove('address2',)
        Cookies.remove('city')  
        Cookies.remove('country')
        Cookies.remove('zipCode')
        Cookies.remove('phone') 
        signOut()

        //router.reload()
        //Cookies.remove('token')

    }

    return (
    <AuthContext.Provider value={{
        ...state,
        loginUser,
        registerUser,
        logout,
    }}>
        {children}
    </AuthContext.Provider>
    )

}