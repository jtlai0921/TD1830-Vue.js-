const routers = [
    {
        path: '/list',
        meta: {
            title: '商品清單'
        },
        component: (resolve) => require(['./views/list.vue'], resolve)
    },
    {
        path: '/product/:id',
        meta: {
            title: '商品詳情'
        },
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '購物車'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/list'
    }
];
export default routers;