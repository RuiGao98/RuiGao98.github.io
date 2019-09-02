// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/Layout'
//import router from './router'
import VueRouter from 'vue-router'
import IndexPage from './pages/index'
import detailPage from './pages/detail'
import VueResource from 'vue-resource'
import axios from 'axios'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailPubPage from './pages/detail/publish'
Vue.use(VueRouter)
Vue.use(IndexPage)
Vue.use(VueResource)

//配置axios
Vue.prototype.$axios = axios
axios.default.baseURL = 'http://localhost:3000'


let router = new VueRouter({
	mode: 'history',//?????
	routes: [
	 {
	 	path: '/',
	 	component: IndexPage
	 },
	 {
	 	path:'/detail',
	 	component: detailPage,
	 	//重定向的方法从而不让用户访问/detail的页面
	 	redirect: '/detail/analysis',
	 	children: [
	 	   {
	 	   	path:'analysis',
	 	   	component: DetailAnaPage
	 	   },
	 	   {
	 	   	path:'count',
	 	   	component: DetailCouPage
	 	   },
	 	   {
	 	   	path:'forecast',
	 	   	component: DetailForPage
	 	   },
	 	   {
	 	   	path:'publish',
	 	   	component: DetailPubPage
	 	   }
	 	]
	 }
	]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
