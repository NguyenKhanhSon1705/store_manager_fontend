const actionTypes = {
    REGISTER: 'REGISTER',
    CONFIRM_EMAIL: 'CONFIRM_EMAIL',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    
    // USER
    GET_CURRENT: 'GET_CURRENT',
    GET_USER_OF_TREE: "GET_USER_OF_TREE",
    GET_USER_OF_LIST: "GET_USER_OF_LIST",
    GET_USER_OF_TREE_BY_ID: "GET_USER_OF_TREE_BY_ID",
    GET_USER_DETAILS: "GET_USER_DETAILS",
    CREATE_USER: "CREATE_USER",
    UPDATE_USER: "UPDATE_USER",

    LOOK_USER: "LOOK_USER",
    LOADING_USER : 'LOADING_USER',
    ERROR_USER : 'ERROR_USER',
    // LOADING
    LOADING : 'LOADING',

    // SHOP
    GET_LIST_SHOP: "GET_LIST_SHOP",
    GET_SHOP_BY_ID: "GET_SHOP_BY_ID",
    CREATE_SHOP: "CREATE_SHOP",
    UPDATE_SHOP: "UPDATE_SHOP",
    DELETE_SHOP: "DELETE_SHOP",
    ACTIVE_SHOP: "ACTIVE_SHOP",
    CHOOSE_SHOP: "CHOOSE_SHOP",
    LOADING_SHOP : 'LOADING_SHOP',
    ERROR_SHOP : 'ERROR_SHOP',


    // Area
    GET_LIST_AREA: "GET_LIST_AREA",
    GET_AREA_BY_ID: "GET_AREA_BY_ID",
    CREATE_AREA: "CREATE_AREA",
    UPDATE_AREA: "UPDATE_AREA",
    DELETE_AREA: "DELETE_AREA",
    LOADING_AREA: 'LOADING_AREA',
    ERROR_AREA: 'ERROR_AREA',

    
    // Tables
    GET_LIST_TABLES: "GET_LIST_TABLES",
    GET_TABLES_BY_ID: "GET_TABLES_BY_ID",
    CREATE_TABLES: "CREATE_TABLES",
    UPDATE_TABLES: "UPDATE_TABLES",
    DELETE_TABLES: "DELETE_TABLES",
    LOADING_TABLES: 'LOADING_TABLES',
    ERROR_TABLES: 'ERROR_TABLES', 

    // roles
    GET_LIST_ROLES_SHOP: 'GET_LIST_ROLES_SHOP',
    LOADING_ROLES: 'LOADING_ROLES',
    ERROR_ROLES: 'ERROR_ROLES', 

    // menu group
    GET_ALL_MENU_GROUP: 'GET_ALL_MENU_GROUP',
    GET_ALL_NAME_MENU_GROUP: 'GET_ALL_NAME_MENU_GROUP',
    CREATE_MENU_GROUP: 'CREATE_MENU_GROUP',
    UPDATE_MENU_GROUP: 'UPDATE_MENU_GROUP',
    DELETE_MENU_GROUP: 'DELETE_MENU_GROUP',

    LOADING_MENU_GROUP: 'LOADING_MENU_GROUP',
    ERROR_MENU_GROUP: 'ERROR_MENU_GROUP',

    // dish
    GET_ALL_DISH: 'GET_ALL_DISH',
    GET_DISH_BY_MENUGROUP: 'GET_DISH_BY_MENUGROUP',
    CREATE_DISH: 'CREATE_DISH',
    UPDATE_DISH: 'UPDATE_DISH',
    DELETE_DISH: 'DELETE_DISH',
    LOADING_DISH: 'LOADING_DISH',
    ERROR_DISH: 'ERROR_DISH',

    // ORDER
    GET_TABLES_BY_AREA: 'GET_TABLES_BY_AREA',
    OPEN_TABLES: 'OPEN_TABLES',
    UPDATE_TABLES_DISH: 'UPDATE_TABLES_DISH',
    GET_INFO_DISH_CURRENT_TABLE: 'GET_INFO_DISH_CURRENT_TABLE',
    GET_INFO_CHECKOUT: 'GET_INFO_CHECKOUT',
    PAYMENT: "PAYMENT",
    CHANGE_TABLE: "CHANGE_TABLE",
    LOADING_ORDER: 'LOADING_ORDER',
    ERROR_ORDER: 'ERROR_ORDER',


    // REPORT
    GET_REPORT_ABORTED: 'GET_REPORT_ABORTED',
    SHOW_REPORT_ABORTED_DETAILS: 'GET_REPORT_ABORTED_DETAILS',
    GET_REPORT_BILL: 'GET_REPORT_BILL',
    SHOW_REPORT_BILL_DETAILS: 'GET_REPORT_BILL_DETAILS',
    LOADING_REPORT: 'LOADING_REPORT',
    GET_REVENUE_REPORT: 'GET_REVENUE_REPORT',
    ERROR_REPORT: 'ERROR_REPORT',
    // ERROR
    FAIL: "FAIL"
}
export default actionTypes