import './css/site.css';
import 'bootstrap';

import Vue from 'vue';
import VueRouter from 'vue-router';

import AppComponent from './components/app/app.vue';
import HomeComponent from './components/home/home.vue';
import CounterComponent from './components/counter/counter.vue';
import FetchDataComponent from './components/fetchdata/fetchdata.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomeComponent },
    { path: '/counter', component: CounterComponent },
    { path: '/fetchdata', component: FetchDataComponent }
];

new Vue({
    el: '#app-root',
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(AppComponent)
});
