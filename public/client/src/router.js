import Vue from 'vue'
import VueRouter from 'vue-router'

import SearchMovies from './components/SearchMovies.vue'
import Login from './components/Login.vue'
import DetailsMovie from './components/DetailsMovie.vue'
import Registration from './components/Registration.vue'
import Logout from './components/Logout.vue'
import Forum from './components/Forum.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/searchMovies'},
        { path: '/searchMovies', component: SearchMovies},
        { path: '/login', component: Login},
        { path: '/detailsMovies/:index',name: 'detailsMovies', component: DetailsMovie, props: true},
        { path: '/registration', component: Registration},
        { path: '/logout', component: Logout},
        { path: '/forum/:index/:idForum',name: 'forum', component: Forum, props: true},
    ]


})