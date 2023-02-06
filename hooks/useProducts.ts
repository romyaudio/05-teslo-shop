import { url } from 'inspector'
import useSWR, { Key, SWRConfiguration } from 'swr'
import { IProduct } from '../interfaces'


//const fetcher = (...args: [Key : string]) => fetch(...args).then(res => res.json())

export const useProducts =(url: string, confi: SWRConfiguration = {}) =>{

    //const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, fetcher,confi)
    const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`,confi)

    return { 
        products : data || [],
        isLoading: !error && !data,
        isError: error
    }
}