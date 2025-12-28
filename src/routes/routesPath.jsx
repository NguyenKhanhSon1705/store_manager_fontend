const ROUTE_PATH = {

   

    home: '/',
    feedback: '/feedback',
    profile: '/@:nickname',
    upload: '/upload',
    search: '/search',

    //auth
    LOGIN: '/login',
    register: '/register',
    forgotpassword: 'forgotpassword',

    // user
    list_user: '/list-user',
    user_detail: '/user-detail',
    update_user: '/update-user/:id',
    delete_user: '/delete-user/:id',
    create_user: '/create-user',

    USER_INFO: '/user-info',
    // shop
    shop: '/shop',
    create_shop: '/create-shop',
    update_shop: '/update-shop',
    shop_detail: '/shop-detail',

    //areas
    areas: '/areas',
    area_detail: '/area-detail/:areaId',

    //tables
    tables: '/tables',

    // menu group
    menu_group: '/menu-group',

    // dish
    dish: '/dish',
    dish_detail: '/dish-detail/:dishId',
    update_dish: '/update-dish/:id',
    delete_dish: '/delete-dish/:id',
    create_dish: '/create-dish',

    // order
    tables_by_area: '/tables-by-area',
    choose_dish_table: '/choose-dish-table',
    CHECK_OUT: '/check-out',
    PAYMENT_INFO: '/payment-info/*',
};

export default ROUTE_PATH;
