import env from "../../constants/env";

function getShopId() {
    const shopId = +atob(localStorage.getItem(env.REACT_APP_IDSHOP))
    return shopId
}

export default getShopId;