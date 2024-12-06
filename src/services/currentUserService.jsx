import httpRequest from "../utils/axios"

export const apiCurrentUser = async (payload) => {
    try{
        const res = await httpRequest.get('/api/authen/get-current-user',{
            params: {
                shopId: payload
            }
        })
        return res
    }catch(e){
        return e
    }
}