import axios from 'axios'

const state = {
	loading: true,
	worldData: [],
	coronaLists: [],
}

const getters = {
	loading: state => state.loading,
	worldData: state => state.worldData,
	coronaLists: state => state.coronaLists,
}

const actions = {
	async fetchworldData({commit}) {
		try{
			const response = await axios.get('https://disease.sh/v2/all');
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
		const response = await axios.get('https://disease.sh/v2/countries')
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
