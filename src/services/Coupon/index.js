import fetcher from '@/helper/fetcher';


const getDiscountPrice = (body) => {
    return fetcher.post(`/coupon/get-discount-price`, body).then(response => {
        return response.data;
    })
}

export const CouponService = {
    getDiscountPrice
}
