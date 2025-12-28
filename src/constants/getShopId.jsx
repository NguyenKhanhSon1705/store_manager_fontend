import env from "./env";

export default function getShopId() {
    try {
        const encoded = localStorage.getItem(env.REACT_APP_IDSHOP);
        if (!encoded) {
            console.warn("ShopId not found in localStorage");
            return 0;
        }
        return +atob(encoded);
    } catch (error) {
        console.error("Error decoding shopId:", error);
        return 0;
    }
}