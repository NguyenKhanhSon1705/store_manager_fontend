import ROUTE_PATH_ADMIN from "./routesPathAdmin"
import Test from "../pageAdmin/Test"
const privateRoute = [
    {name: "Admin", path:ROUTE_PATH_ADMIN.TEST , component: Test , layout:null},
]

const routesAdmin = {
    privateRoute
}
export default routesAdmin