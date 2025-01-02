import { useAuth } from '@/context/AuthContext'
import React from 'react'

interface AddDiscountprops {
    data: {
        tax: number,
        total: number,
        subtotal: number,
        discount: number,
    }
}

const ConfirmTotal = ({ data }: AddDiscountprops) => {
   const {CMSData} = useAuth()
    return (
        <>
            <div className='flex justify-between w-full p-2 text-center'>
                <div> <span>SUB-TOTAL</span></div>
                <div> <span>${data?.subtotal}</span></div>
            </div>

            <div className='flex justify-between w-full p-2 text-center'>
                <div> <span>DISCOUNT</span></div>
                <div> <span>${data?.discount}</span></div>
            </div>

            <div className='flex justify-between w-full p-2 text-center'>
                <div> <span>GROSS-TOTAL</span></div>
                <div> <span>${data?.subtotal}</span></div>
            </div>
            <div className='flex justify-between w-full p-2 text-center'>
                <div> <span>Tax - {CMSData.tax}%</span></div>
                <div> <span>${data?.tax}</span></div>
            </div>


            <div className='flex justify-between p-2 text-center'>
                <div>
                    <span className='font-bold text-[--brand-color]'>NET-TOTAL</span>
                </div>
                <div>
                    <span className='font-bold '>${data?.total}</span>
                </div>
            </div>

        </>
    )
}

export default ConfirmTotal
