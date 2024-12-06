import httpRequest from "../utils/axios"
import env from "../constants/env"

export const apiGetListAreas = async () =>{
    try{
        const idShop = +atob(localStorage.getItem(env.REACT_APP_IDSHOP))
        const res = await httpRequest.get('/api/areas/get-list-areas', {
            params: {
                idShop: idShop
            }   
        })
        return res
        
    }catch(e){
        return e
    }
}

export const apiGetAreaById = async (payload)=>{
    try{
        const res = await httpRequest.get('/api/areas/get-area-by-id', {
            params: {
                id: payload
            }
        })
        return res
    }catch(e){
        return e
    }
}
export const apiCreateArea = async (payload)=>{
    try{
        const shopId = +atob(localStorage.getItem(env.REACT_APP_IDSHOP))
        const res = await httpRequest.post('/api/areas/create-area', {
            idShop: shopId,
            areaName: payload.areaName,
        })
        
        return res
    }catch(e){
        return e
    }
}
export const apiUpdateArea = async (payload)=>{
    try{
        const res = await httpRequest.put('/api/areas/update-area', {
            id: payload.id,
            areaName: payload.areaName  
        })
        return res
    }catch(e){
        return e
    }
}
export const apiDeleteArea = async (payload)=>{
    try{
        const res = await httpRequest.delete('/api/areas/delete-area', {
            params: {
                id: payload
            }
        })
        return res
    }catch(e){
        return e
    }
}