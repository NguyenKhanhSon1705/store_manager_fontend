import httpRequest from "~/utils/axios"
import customResponse from "./customResponse"

const apiPaymentVnPay = async (payload) =>{
    try{
        const res = await httpRequest.get("/api/vnpay/createpaymenturl", {
            params : {
                moneyToPay: payload.total_money,
                description: payload.description,
                shop_id: payload.shop_id,
                table_id: payload.table_id
            }
        })
      
        return res.data
    }catch(e){
        console.log(e);
        return customResponse(e)
    }
}

const apiGetResultPayment = async (payload) => {
    try{
        const res = await httpRequest.get(`/api/vnpay/callback/${payload}`)
        
        if(res.data.isSuccess){
            return res.data
        }
        return res.response.data
    }catch(e){
        return customResponse(e)
    }
}

const vnpayService = {
    apiPaymentVnPay,
    apiGetResultPayment
}
export default vnpayService