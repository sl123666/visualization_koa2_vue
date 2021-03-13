import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Seller from '../view/seller/index';
import Trend from '../view/trend/index';
import Map from '../view/map/index';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/seller',
            name: 'seller',
            component: Seller
        },
        {
            path: '/trend',
            name: 'trend',
            component: Trend
        },
        {
            path: '/map',
            name: 'map',
            component: Map
        }
    ]
})
