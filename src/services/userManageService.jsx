import httpRequest from "../utils/axios"
import env from "../constants/env"

export const apiGetUserOfTree = async ()=>{
    try{
        const response = await httpRequest.get('/api/users/get-user-tree')
        return response
    }
    catch(e){
        return e
    }
}
export const apiGetUserOfList = async (payload)=>{
    try{
        const response = await httpRequest.get('/api/users/get-user-all' , {
            params: {
                PageIndex: payload
            }
        })
        return response
    }
    catch(e){
        return e
    }
}

export const apiGetUserOfTreeById = async (payload)=>{
    try{
        const response = await httpRequest.get('/api/users/get-user-tree-by-id',{
            params: {
                id: payload
            }
        })
        return response
    }
    catch(e){
        return e
    }
}
export const apiGetUserDetails = async (payload)=>{
    try{
        const response = await httpRequest.get('/api/users/get-user-id',{
            params: {
                userId: payload
            }
        })
        return response
    }
    catch(e){
        return e
    }
}

export const apiCreateUser = async (payload) => {
    try{
        payload.idShop = +atob(localStorage.getItem(env.REACT_APP_IDSHOP))
        const res = await httpRequest.post("/api/users/create-user" ,payload )
        return res
    }catch(e){
        return e
    }
}

export const apiUpdateUser = async (payload)=>{
    try{
        const formData = new FormData();

        formData.append('Id', payload.id);
        formData.append('FullName', payload.fullName);
        formData.append('phoneNumber', payload.phoneNumber);
        payload.picture && formData.append('Picture', payload.picture); // Append file
        formData.append('Address', payload.address);
        formData.append('RoleId', payload.roleId);
        payload.birthDay && formData.append('BirthDay', payload.birthDay  );
        payload.gender && formData.append('Gender', payload.gender);
        console.log(formData);
        
        const response = await httpRequest.put('/api/users/update-user', formData)
        return response
    }
    catch(e){
        return e
    }
}

export const apiLookUser = async (payload) => {
    try {
        const response = await httpRequest.put('/api/users/lock-user',{
            id: payload
        })
        
        return response
    } catch (e) {
        return e
    }   
}