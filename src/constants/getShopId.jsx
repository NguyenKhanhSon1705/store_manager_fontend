import env from "./env";

export default function getShopId() {
    return +atob(localStorage.getItem(env.REACT_APP_IDSHOP))
}