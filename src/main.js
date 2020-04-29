import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VueRouter from 'vue-router'
import Credits from './components/Credits.vue'
import TopPage from './components/TopPage.vue'
import AllListCovid from './components/AllListCovid.vue'
import NothingFound from './components/NothingFound.vue'
import SingleCountry from './components/SingleCountry.vue'
import ServiceUnavailable from './components/ServiceUnavailable.vue'


Vue.use(VueRouter);

Vue.config.productionTip = false

Vue.mixin({
	methods: {
		formatNum(num) {
			if(!isNaN(num)) {
				return num.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		},
		updatedTime(x) {
			const today = new Date(x);
			const monthName = today.toLocaleString('default', { month: 'long',  });
			const date = monthName+' '+today.getDate()+','+today.getFullYear();
			const time = today.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true });
			return time+ ' ' + date;
		},
	}

});

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: TopPage,
			meta: {
				title: 'JPARBA | HOME',
				metaTags: [
				{
					name: 'description',
					content: 'Jparba.com homepage'
				},
				]
			}
		},
		{
			path: '/covid-19',
			component: AllListCovid,
			meta: {
				title: 'JPARBA | Covid-19 Bulletin',
				metaTags: [
				{
					name: 'description',
					content: 'Jparba.com'
				},
				]
			},
		},
		{
			path: '/covid-19/country/:country',
			component: SingleCountry,
			props: true,
		},
		{
			path: '/covid-19/credits',
			component: Credits,
			meta: {
				title: 'JPARBA | Credits',
				metaTags: [
				{
					name: 'description',
					content: 'Jparba.com credits'
				},
				]
			}
		},
		{
			path: '/serviceunavailable',
			component: ServiceUnavailable
		},
		{
			path: '*',
			component: NothingFound,
			meta: {
				title: 'JPARBA | 404',
				metaTags: [
				{
					name: 'description',
					content: 'Jparba.com 404 page not found'
				},
				]
			}
		},
	],
	mode: 'history'
});

router.beforeEach((to, from, next) => {
const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
if(!nearestWithMeta) return next();
nearestWithMeta.meta.metaTags.map(tagDef => {
	const tag = document.createElement('meta');
	Object.keys(tagDef).forEach(key => {
		tag.setAttribute(key, tagDef[key]);
	});
	tag.setAttribute('data-vue-router-controlled', '');
	return tag;
}).forEach(tag => document.head.appendChild(tag));
next();
});


new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')