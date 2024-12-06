import httpRequest from "../utils/axios"

export const apiGetListRolesShop = async () => {
    try{
        const response = await httpRequest.get('/api/roles/get-list-role-shop')
        return response
    }catch(e){
        return e
    }
}