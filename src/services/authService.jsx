import httpRequest from "../utils/axios"


export const apiRegister = async (payload) => {
    try {
        const response = await httpRequest.post('/api/authen/register', {
            email: payload.email,
            password: payload.password,
            phone: payload.phone
        })
        return response
    }
    catch (e) {
        return e
    }
}
export const apiConfirmEmail = async (payload) => {
    try {
        const response = await httpRequest.post('/api/authen/confirm-email', {
            email: payload.email,
            code: payload.code
        })
        return response
    } catch (e) {
        return e
    }
}
export const apiLogin = async (payload) => {
    try {
        const response = await httpRequest.post('/api/authen/login', {
            email: payload.email,
            password: payload.password
        })
        return response
    } catch (e) {
        return e
    }
}

export const apiLogout  = async () =>{
    try{
        await httpRequest.post('/api/authen/logout',{})
        return true
    }catch(e){
        return e
    }
}