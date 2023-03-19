import { ISize } from "./products"
import { IUser } from "./user"

export interface IOrder {
    _id?: string
    user?: IUser | string
    orderItems: IOrderItem[]
    shippingAddress: ShippingAddress
    paymentResult?: string
    numberOfItems: number
    subTotal: number;
    tax: number;
    total: number;
    isPaid: boolean
    paidAt?: string
    transactionId?: string


}

export interface IOrderItem {
    _id: string
    title: string
    size: ISize
    quantity: number
    slug: string
    image: string
    gender: string
    price: number
}

export interface ShippingAddress {
    FistName: string
    LastName: string
    address: string
    address2?: string
    city: string
    country: string
    zipCode: string
    phone: string
}