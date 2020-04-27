import Vuex from 'vuex'
import Vue from 'vue'
import corona from './modules/corona'

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		corona
	}
});