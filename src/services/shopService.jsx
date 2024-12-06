import httpRequest from "../utils/axios"

export const apiGetListShopUser = async () =>{
    try{
        const response = await httpRequest.get('/api/shop/get-list-shop')
        return response
    }
    catch(e){
        return e
    }
}

export const apiGetShopById = async (payload) => {
    try{
        const response = await httpRequest.get('/api/shop/get-shop-by-id' , {
            params:{
                idShop: payload
            }
        })
        return response
    }
    catch(e){
        return e
    }
}

export const apiCreateShop = async (payload) =>{
    try{
        const formData = new FormData();
        formData.append('ShopName', payload.nameShop);
        formData.append('ShopPhone', payload.phoneShop);
        payload.logoShop && formData.append('ShopLogo', payload.logoShop); // Append file
        formData.append('ShopAddress', payload.addressShop);
        
        const response = await httpRequest.post('/api/shop/create-shop',formData)
        return response
    }
    catch(e){
        return e
    }
}

export const apiUpdateShop = async (payload)=>{
    console.log(payload);
    try{
        const formData = new FormData();

        formData.append('Id', payload.id);
        formData.append('ShopName', payload.shopName);
        formData.append('ShopPhone', payload.shopPhone);
        payload.shopLogo && formData.append('ShopLogo', payload.shopLogo); // Append file
        formData.append('ShopAddress', payload.shopAddress);

        const response = await httpRequest.put('/api/shop/update-shop', formData)
        return response
    }catch(e){
        return e
    }
}

export const apiDeleteShop = async (payload)=>{
    try{
        const response = await httpRequest.delete('/api/shop/delete-shop',{
            params:{
                id: payload.id,
                password: payload.password
            }
        })
        return response
    }catch(e){
        return e
    }
}