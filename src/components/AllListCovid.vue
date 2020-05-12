<template>
	<div class="container">
		<SearchCountry/>
		<div v-if="loading" class="d-flex align-items-center flex-column mt-5">
			<div class="spinner-grow text-success text-center" role="status"></div>
			<p class="text-center">fetching data ...</p>
		</div>

		<div v-if="worldData != '' && !loading">
			<h3 class="mt-4 text-center mb-0">Covid-19 {{label}}</h3>
			<small class="d-block text-center mb-4">Data source : NovelCOVID API</small>
			<ul class="d-flex tab_trigger mb-0">
				<li class="active" @click="showHidetab" data-tabcontent="_1">Philippines cases</li>
				<li @click="showHidetab" data-tabcontent="_2">World cases</li>
			</ul>
			<div class="singlerecord text-center mb-5">
				<div class="tab_content _1">
					<router-link to="/covid-19/region" class="btn btn-primary float-right z2">Click to view data by region</router-link>
					<div class="clearfix"></div>
					<div v-for="(coronaList, index) in coronaLists" :key="index">
						<div v-if="coronaList.country == 'Philippines'">
							<p class="totalcase"><animated-number :value="coronaList.cases" :formatValue="formatNum" :duration="3000"/><span>Confirmed cases</span></p>
							<ul class="subdata row justify-content-center">
								<li class="col-md-4">
									<div>
										<h4 class="bg-white">New Cases</h4>
										<div>
											<p><animated-number :value="coronaList.todayCases" :formatValue="formatNum" :duration="3000"/></p>
											<label><animated-number :value="yesterdayData.todayCases" :formatValue="formatNum" :duration="1000"/><span class="ml-1 bg-white">Yesterday</span></label>
										</div>
									</div>
								</li>
								<li class="col-md-4">
									<div>
										<h4 class="bg-danger">Today's Death</h4>
										<div>
											<p><animated-number :value="coronaList.todayDeaths" :formatValue="formatNum" :duration="3000"/></p>
											<label><animated-number :value="yesterdayData.todayDeaths" :formatValue="formatNum" :duration="1000"/><span class="ml-1 bg-danger">Yesterday</span></label>
										</div>
									</div>
								</li>
								<li class="col-md-4">
									<div>
										<h4 class="bg-success">Total recovered</h4>
										<div>
											<p><animated-number :value="coronaList.recovered" :formatValue="formatNum" :duration="3000"/></p>
											<label><animated-number :value="coronaList.recovered - todayRecovered" :formatValue="formatNum" :duration="1000"/><span class="ml-1 bg-success">Recoveries Today</span></label>
										</div>
									</div>
								</li>
								<li class="col-md-4">
									<div>
										<h4 class="bg-danger">Total Deaths</h4>
										<div>
											<p><animated-number :value="coronaList.deaths" :formatValue="formatNum" :duration="3000"/></p>
										</div>
									</div>
								</li>
								<li class="col-md-4">
									<div>
										<h4 class="bg-primary">Active</h4>
										<div>
											<p><animated-number :value="coronaList.active" :formatValue="formatNum" :duration="3000"/></p>
										</div>
									</div>
								</li>
								<li class="col-md-4">
									<div>
										<h4 class="bg-warning">Critical</h4>
										<div>
											<p><animated-number :value="coronaList.critical" :formatValue="formatNum" :duration="3000"/></p>
										</div>
									</div>
								</li>
								<li class="col-md-4">
									<div>
										<h4 class="bg-semipink">Tests</h4>
										<div>
											<p><animated-number :value="coronaList.tests" :formatValue="formatNum" :duration="3000"/></p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="tab_content _2 d-none">
					<p class="totalcase"><animated-number :value="worldData.cases" :formatValue="formatNum" :duration="3000"/><span>Confirmed cases</span></p>
					<ul class="subdata row justify-content-center">
						<li class="col-md-4">
							<div>
								<h4 class="bg-white">New Cases</h4>
								<div>
									<p><animated-number :value="worldData.todayCases" :formatValue="formatNum" :duration="3000"/></p>
									<!-- <label><span class="bg-white">Yesterday</span></label> -->
								</div>
							</div>
						</li>
						<li class="col-md-4">
							<div>
								<h4 class="bg-danger">Today Deaths</h4>
								<div>
									<p><animated-number :value="worldData.todayDeaths" :formatValue="formatNum" :duration="3000"/></p>
									<!-- <label class="mt-"><span class="bg-danger">Yesterday</span></label> -->
								</div>
							</div>
						</li>
						<li class="col-md-4">
							<div>
								<h4 class="bg-success">Total recovered</h4>
								<div>
									<p><animated-number :value="worldData.recovered" :formatValue="formatNum" :duration="3000"/></p>
								</div>
							</div>
						</li>
						<li class="col-md-4">
							<div>
								<h4 class="bg-danger">Total Deaths</h4>
								<div>
									<p><animated-number :value="worldData.deaths" :formatValue="formatNum" :duration="3000"/></p>
								</div>
							</div>
						</li>
						<li class="col-md-4">
							<div>
								<h4 class="bg-primary">Active</h4>
								<div>
									<p><animated-number :value="worldData.active" :formatValue="formatNum" :duration="3000"/></p>
								</div>
							</div>
						</li>
						<li class="col-md-4">
							<div>
								<h4 class="bg-warning">Critical</h4>
								<div>
									<p><animated-number :value="worldData.critical" :formatValue="formatNum" :duration="3000"/></p>
								</div>
							</div>
						</li>
						<li class="col-md-4">
							<div>
								<h4 class="bg-pink">Affected Countries</h4>
								<div>
									<p><animated-number :value="worldData.affectedCountries" :formatValue="formatNum" :duration="3000"/></p>
								</div>
							</div>
						</li>
						<li class="col-md-4">
							<div>
								<h4 class="bg-semipink">Tests</h4>
								<div>
									<p><animated-number :value="worldData.tests" :formatValue="formatNum" :duration="3000"/></p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<ul v-if="coronaLists != '' && !loading" class="row country_affected">
			<li class="col-md-4 col-sm-6 mb-4" v-for="(coronaList, index) in coronaLists" :key="index">
				<router-link :to="{ path: `/covid-19/country/${coronaList.country}` }">
				<!-- <a href=""> -->
					<div class="card">
						<div class="card-body">
							<h5 class="d-flex card-title"><div><img :src="coronaList.countryInfo.flag" :alt="coronaList.country" width="35"></div><span class="ml-2">{{ coronaList.country }}</span></h5>
							<table class="listtable">
								<tr>
									<td>
										<div>Total cases</div>
										<div>{{ formatNum(coronaList.cases) }}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Total deaths</div>
										<div>{{ formatNum(coronaList.deaths) }}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Active</div>
										<div>{{ formatNum(coronaList.active) }}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Recovered</div>
										<div>{{ formatNum(coronaList.recovered) }}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Today cases</div>
										<div>{{ formatNum(coronaList.todayCases) }}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div>Today deaths</div>
										<div>{{ formatNum(coronaList.todayDeaths) }}</div>
									</td>
								</tr>
							</table>
						</div>
					</div>
				<!-- </a> -->
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import { mapActions, mapGetters } from 'vuex'
	import SearchCountry from './SearchCountry.vue'
	import AnimatedNumber from "animated-number-vue";

	export default {
		name: 'AllListCovid',
		data() {
			return {
				polling: null,
				label: 'Philippines cases',
				yesterdayData: [],
				phDataByRegion: [],
				todayRecovered: ''
			}
		},
		components: {
			SearchCountry,
			AnimatedNumber
		},
		methods: {
			...mapActions(['fetchCoronaList', 'fetchworldData']),
			pollData() {
				this.polling = setInterval(() => {
					this.$store.dispatch('fetchworldData')
					this.$store.dispatch('fetchCoronaList')
				}, 120000);
			},
			async getYesterdayData(countryName) {
				let response = await axios.get(`https://corona.lmao.ninja/v2/countries/${countryName}?yesterday=true&strict=true&query`);
					this.todayRecovered = response.data.recovered;
				return this.yesterdayData = response.data;
			},
			showHidetab(e) {
				let tab_trigger = document.querySelectorAll('.tab_trigger li');
				for (let tab_trig of tab_trigger) {
					tab_trig.classList.remove('active');
				}
				e.target.classList.add('active');
				this.label = e.target.innerText;
				let alltab_content = document.querySelectorAll('.tab_content');
				for (let tab_content of alltab_content) {
					tab_content.classList.add('d-none');
				}
				let data = e.target.dataset.tabcontent;
				let x = document.getElementsByClassName(`tab_content ${data}`)[0];
				x.classList.remove('d-none');
			}
		},
		computed: {
			...mapGetters(['coronaLists', 'worldData', 'loading']),
		},
		created() {
			this.pollData();
			this.fetchworldData();
			this.fetchCoronaList();
			this.getYesterdayData('Philippines');
		},
		beforeDestroy() {
			clearInterval(this.polling)
		},
	}
</script>

<style>

</style>