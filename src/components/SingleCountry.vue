<template>
	<div class="container mt-5">
		<SearchCountry/>
		<div v-if="loading" class="d-flex align-items-center flex-column mt-5">
			<div class="spinner-grow text-success text-center" role="status"></div>
			<p class="text-center">fetching data ...</p>
		</div>
		<div v-if="fetchError">{{ $route.params.country }} not found or doesn't have any cases</div>
		<div v-if="singleCountry != '' && !loading" class="mb-5">
			<h5 class="mt-4 text-center mb-0">Current data of "{{ $route.params.country.toUpperCase() }}"</h5>
			<small class="d-block text-center mb-4">Data source : NovelCOVID API</small>
			<div class="singlerecord text-center">
				<p class="totalcase"><animated-number :value="singleCountry.cases" :formatValue="formatNum" :duration="1000"/><span>Confirmed cases</span></p>
				<ul class="subdata row justify-content-center">
					<li class="col-md-4">
						<div>
							<h4 class="bg-white">New Cases</h4>
							<div>
								<p><animated-number :value="singleCountry.todayCases" :formatValue="formatNum" :duration="1000"/></p>
								<label><animated-number :value="yesterdayData.todayCases" :formatValue="formatNum" :duration="1000"/><span class="ml-1 bg-white">Yesterday</span></label>
							</div>
						</div>
					</li>
					<li class="col-md-4">
						<div>
							<h4 class="bg-danger">Today's Death</h4>
							<div>
								<p><animated-number :value="singleCountry.todayDeaths" :formatValue="formatNum" :duration="1000"/></p>
								<label><animated-number :value="yesterdayData.todayDeaths" :formatValue="formatNum" :duration="1000"/><span class="ml-1 bg-danger">Yesterday</span></label>
							</div>
						</div>
					</li>
					<li class="col-md-4">
						<div>
							<h4 class="bg-success">Total recovered</h4>
							<div>
								<p><animated-number :value="singleCountry.recovered" :formatValue="formatNum" :duration="1000"/></p>
								<label><animated-number :value="singleCountry.recovered - todayRecovered" :formatValue="formatNum" :duration="1000"/><span class="ml-1 bg-success">Recoveries Today</span></label>
							</div>
						</div>
					</li>
					<li class="col-md-4">
						<div>
							<h4 class="bg-danger">Total Deaths</h4>
							<div>
								<p><animated-number :value="singleCountry.deaths" :formatValue="formatNum" :duration="1000"/></p>
							</div>
						</div>
					</li>
					<li class="col-md-4">
						<div>
							<h4 class="bg-primary">Active</h4>
							<div>
								<p><animated-number :value="singleCountry.active" :formatValue="formatNum" :duration="1000"/></p>
							</div>
						</div>
					</li>
					<li class="col-md-4">
						<div>
							<h4 class="bg-warning">Critical</h4>
							<div>
								<p><animated-number :value="singleCountry.critical" :formatValue="formatNum" :duration="1000"/></p>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import SearchCountry from './SearchCountry.vue'
	import AnimatedNumber from "animated-number-vue";
	export default {
		data() {
			return {
				loading: true,
				fetchError: false,
				singleCountry: [],
				polling: null,
				yesterdayData: [],
				todayRecovered: ''
			}
		},
		components: {
			SearchCountry,
			AnimatedNumber
		},
		props: ['country'],
		name: 'SingleCountry',
		methods: {
			async fetchSingleCountry() {
				try{
					const response = await axios.get(`https://disease.sh/v2/countries/${this.country}`);
					this.singleCountry = response.data;
					setTimeout(() => {
						this.loading = false;
					}, 2000);
				} catch(error) {
					if (error.response) {
						if (error.response.status == 404 ) {
							this.loading = false;
							this.fetchError = true;
						}
						if (error.request || error.response.status == 503 || error.response.status == 502) {
							window.location.replace("/serviceunavailable");
						}
					}
				}
			},
			async getYesterdayData() {
				let response = await axios.get(`https://corona.lmao.ninja/v2/countries/${this.country}?yesterday=true&strict=true&query`);
					this.todayRecovered = response.data.recovered;
				return this.yesterdayData = response.data;
			},
			pollData() {
				this.polling = setInterval(() => {
					this.fetchSingleCountry()
				}, 120000);
			}
		},
		watch: {
			country() {
				this.getYesterdayData();
				this.fetchSingleCountry();

			}
		},
		created() {
			this.pollData();
			this.getYesterdayData();
			this.fetchSingleCountry();
		},
		beforeDestroy() {
			clearInterval(this.polling)
		},
	}
</script>

<style></style>