import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import currentUserReducer from "./reducers/currentUserReducer";
import userManage from "./reducers/userManageReducer";
import shopReducer from "./reducers/shopReducer";
import areasReducer from "./reducers/areasReducer";
import tablesReducer from "./reducers/tablesReducer";
import rolesReducer from "./reducers/rolesReducer";
import menuGroupReducer from "./reducers/menuGroupReducer";
import dishReducer from "./reducers/dishReducer";
import orderReducer from "./reducers/orderReducer";
import reportReducer from "./reducers/reportReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    currentUser: currentUserReducer,
    userManage: userManage,
    shop: shopReducer,
    area: areasReducer,
    table: tablesReducer,
    role: rolesReducer,
    menuGroup: menuGroupReducer,
    dish: dishReducer,
    order:orderReducer,
    report: reportReducer
  });

export default rootReducer