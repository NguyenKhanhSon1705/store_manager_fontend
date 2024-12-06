import httpRequest from "../utils/axios"
import env from "../constants/env"
import getShopId from "../constants/getShopId"

export const apiCreateMenuGroup = async (payload) => {
    try {
        const shopId = +atob(localStorage.getItem(env.REACT_APP_IDSHOP))
        const formData = new FormData()
        formData.append("shopId", shopId)
        formData.append('name', payload.name);
        formData.append('order', payload.order);
        formData.append('image', payload.image); // Cần đổi thành file nếu có
        formData.append('description', payload.description);
        formData.append('status', payload.status);

        const response = await httpRequest.post('/api/menugroup/create-menu-group', formData)
        return response
    } catch (e) {
        return e
    }
}

export const apiDeleteMenuGroup = async (payload) => {
    try {
        const response = await httpRequest.delete('/api/menugroup/delete-menu-group', {
            params: {
                id: payload
            }
        })
        return response
    } catch (e) {
        return e
    }
}

export const apiUpdateMenuGroup = async (payload) => {
    const formData = new FormData()
        formData.append("id", payload.id)
        formData.append('name', payload.name);
        formData.append('order', payload.order);
        formData.append('image', payload.image); // Cần đổi thành file nếu có
        formData.append('description', payload.description);
        formData.append('status', payload.status);
    try {
        const response = await httpRequest.put('/api/menugroup/update-menu-group', formData)
        return response
    } catch (e) {
        return e
    }
}

export const apiGetAllMenuGroup = async (payload) => {
    try {
        const shopId = +atob(localStorage.getItem(env.REACT_APP_IDSHOP))

        const response = await httpRequest.get('/api/menugroup/get-all-menu-group', {
            params: {
                pageIndex: payload.pageIndex || 1,
                limit: payload.limit || 5,
                search: payload.search || '',
                shopId: shopId
            }
        })
        return response
    } catch (e) {
        return e
    }
}

export const apiGetNameMenuGroup = async () =>{
    try {
        const response = await httpRequest.get('/api/menugroup/get-all-name-menu-group', {
            params: {
                shopId: getShopId()
            }
        })
        return response
    } catch (e) {
        return e
    }
}