<template>
	<div>
		<div class="close_autocomplete" @click="showfilteredCountries = false"></div>
		<div class="container posr p-0 d-flex flex-column align-items-center mt-5">
			<input type="text" class="z2 form-control mw-500" placeholder="Search by country" v-model="inputCountry" @focus="showfilteredCountries = true">
			<div v-if="filteredCountries && showfilteredCountries" class="mw-500">
				<ul class="countrylist">
					<li v-for="(data, index) in filteredCountries" @click="searchVal(data.country)" :key="index">
						<div class="d-flex">
							<img :src="data.flag" alt="" width="35" height="22">
							<p class="mb-0 ml-1">{{ data.country }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				inputCountry: '',
				countries: [],
				filteredCountries: [],
				showfilteredCountries: false
			}
		},
		name: 'SearchCountry',
		methods: {
			listCountry() {
				const countryArray = this.countries;
				axios.get('https://corona.lmao.ninja/v2/countries')
					.then( function(response){
						const rr = response.data.length;
						for (var i = 0; i < rr; i++) {
							// countryArray.push(response.data[i]['country']);
							countryArray.push(
								{
								'country' : response.data[i]['country'],
								'flag': response.data[i]['countryInfo']['flag']
							});
						}
					});
			},
			filterCountries() {
				const cty = this.inputCountry;
				this.filteredCountries = this.countries.filter((country) => {
					return country.country.toLowerCase().startsWith(cty.toLowerCase());
				});
			},
			searchVal(val) {
				const country = val.toLowerCase();
				this.inputCountry = val;
				this.showfilteredCountries = false;
				this.$router.push(`/covid-19/country/${country}`);
			},
			filterCountry() {
				if(this.filteredCountries.length == 0){
					this.filteredCountries = this.countries
				}
				if(this.$route.params.country != undefined){
					this.inputCountry = this.$route.params.country;
				}
			},
		},
		watch: {
			inputCountry() {
				this.filterCountries();
			}
		},
		mounted(){
			this.listCountry();
			this.filterCountry();
		}

	}
</script>

<style></style>