<template>
	<div class="container">
		<SearchCountry/>
		<h3 class="mt-4 text-center mb-0">Covid-19 World data</h3>
		<small class="d-block text-center mb-4">Data source : NovelCOVID API</small>
		<div v-if="loading" class="d-flex align-items-center flex-column mt-5">
			<div class="spinner-grow text-success text-center" role="status"></div>
			<p class="text-center">fetching data ...</p>
		</div>
		<div v-if="worldData != '' && !loading" class="singlerecord text-center mb-5">
			<p class="totalcase">

			</p>
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
	import { mapActions, mapGetters } from 'vuex'
	import SearchCountry from './SearchCountry.vue'
	import AnimatedNumber from "animated-number-vue";

	export default {
		name: 'AllListCovid',
		components: {
			SearchCountry,
			AnimatedNumber
		},
		methods: {
			...mapActions(['fetchCoronaList', 'fetchworldData']),
		},
		computed: {
			...mapGetters(['coronaLists', 'worldData', 'loading']),
		},
		mounted() {
			this.fetchworldData();
			this.fetchCoronaList();
		}
	}
</script>

<style>

</style>