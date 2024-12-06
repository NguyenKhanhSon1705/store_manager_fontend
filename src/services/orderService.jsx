import httpRequest from "../utils/axios"
import customResponse from "./customResponse";

const apiGetTablesByArea = async (payload) =>{
    try{
        const res = await httpRequest.get('/api/tablearea/get-tables-by-area', {
            params: {
                areaId: payload
            }
        })
        if(res.data.isSuccess){
            return res.data
        }
        return res.response
    }catch(e){
        return customResponse(e);
    }
}
const apiOpenTable = async (payload) => {
    
    try{
        const res = await httpRequest.post('/api/ordertabledish/open-table-dish', payload)
        if(res.data.isSuccess){
            return res.data
        }
        return res.response
    }catch(e){
        return customResponse(e);
    }
}
const apiGetInfoDishCurrentTable = async (payload) => {
    try{
        const res = await httpRequest.get('/api/ordertabledish/get-dish-table', {
            params: {
                tableId: payload
            }
        })
        if(res.data.isSuccess){
            return res.data
        }
        return res.response
    }catch(e){
        return customResponse(e);
    }
}
const apiAbortedtable = async (payload) => {
    try{
        const res = await httpRequest.post('/api/ordertabledish/aborted-table', payload)
        if(res.data.isSuccess){
            return res.data
        }
        return res.response
    }catch(e){
        return customResponse(e);
    }
}
const apiUpdateTableDish = async (payload) => {
    console.log(payload);
    
    try{
        const res = await httpRequest.post('/api/ordertabledish/update-dish-table', payload)
        if(res.data.isSuccess){
            return res.data
        }
        return res.response
    }catch(e){
        return customResponse(e);
    }
}

const orderService = {
    apiGetTablesByArea,
    apiOpenTable,
    apiGetInfoDishCurrentTable,
    apiAbortedtable,
    apiUpdateTableDish
}
export default orderService