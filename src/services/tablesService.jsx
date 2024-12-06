import httpRequest from "../utils/axios"
import env from "../constants/env"

export const apiCreateTable = async (payload) => {
    try{
        const res = await httpRequest.post('/api/tables/create-tables',{
            "AreaId": payload.areaId,
            "NameTable": payload.nameTable,
            "HasHourlyRate": payload.hasHourlyRate,
            "PriceOfMunite": payload.priceOfMunite
        })
        return res
    }
    catch(e){
        return e
    }
}

export const apiGetListTables = async () => {
    try{
        const shopId = +atob(localStorage.getItem(env.REACT_APP_IDSHOP))
        
        const res = await httpRequest.get('/api/tables/get-table-area',{
            params: {
                shopId: shopId
            }
        })
        return res
    }catch(e){
        return e
    }
}
export const apiUpdateTables = async (payload) =>{
    try{
        const res = await httpRequest.put('/api/tables/update-tables', {
            "Id": payload.id,
            "AreaId": payload.areaId,
            "NameTable": payload.nameTable,
            "HasHourlyRate": payload.hasHourlyRate,
            "PriceOfMunite": payload.priceOfMunite
        })
        return res
    }catch(e){
        return e
    }
}

export const apiDeleteTables = async (payload) =>{
    try{
        const res = await httpRequest.delete('/api/tables/delete-tables', {
            params: {
                id: payload
            }
        })
        return res
    }catch(e){
        return e
    }
}