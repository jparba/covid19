import axios from 'axios'

const state = {
	loading: true,
	coronaLists: [],
	worldData: [],
	phCases: [],
}

const getters = {
	coronaLists: state => state.coronaLists,
	worldData: state => state.worldData,
	loading: state => state.loading,
}

const actions = {
	async fetchworldData({commit}) {
		try{
			const response = await axios.get('https://corona.lmao.ninja/v2/aldl');
			commit('SETWORLDDATA', response.data);
			setTimeout(() => {
				commit('SETLOADING', false);
			}, 2000);
		} catch(error) {
			if (error.request) {
				window.location.replace("/serviceunavailable");
			}
		}
	},
	async fetchCoronaList({commit}) {
		const response = await axios.get('https://corona.lmao.ninja/v2/countries')
		.catch(function (error) {
			if (error.response) {
				if (error.response.status == 503 || error.response.status == 404 || error.response.status == 502) {
					window.location.replace("/serviceunavailable");
				}
			}
		});
		commit('SETCORONALISTS', response.data);
	},
}

const mutations = {
	SETLOADING: (state, loading) => state.loading = loading,
	SETWORLDDATA: (state, worldData) => state.worldData = worldData,
	SETCORONALISTS: (state, coronaLists) => state.coronaLists = coronaLists,
}

export default {
	state,
	getters,
	actions,
	mutations
}
