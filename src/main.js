import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VueRouter from 'vue-router'
import Credits from './components/Credits.vue'
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
		{ path: '', component: AllListCovid },
		{ path: '/country/:country', component: SingleCountry, props: true },
		{ path: '/credits', component: Credits },
		{ path: '/serviceunavailable', component: ServiceUnavailable },
		{ path: '*', component: NothingFound },
	],
	mode: 'history'
});

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
