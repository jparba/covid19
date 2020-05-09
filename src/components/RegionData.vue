<template>
	<div class="container">
		<!-- <SearchCountry/> -->
		<div v-if="loading" class="d-flex align-items-center flex-column mt-5">
			<div class="spinner-grow text-success text-center" role="status"></div>
			<p class="text-center">fetching data ...</p>
		</div>
		<div v-if="!loading && !fetching">
			<div class="row">
				<div class="col-md-3">
					<select v-model="chooseRegion" class="form-control d-none mb-3">
						<option value="test">Choose region</option>
						<option v-for="(item, index) in regionData" :key="index" :value="index">{{ index }}</option>
					</select>
					<div class="region_list">
						<h4>List of Regions</h4>
						<ul>
							<li v-for="(item, index) in regionData" :key="index" @click="filterRegion(index)" :class="chooseRegion == index ? 'active': ''">{{ index }}</li>
						</ul>
					</div>
				</div>
				<div class="col-md-9">
					<h5 class="region_name">{{ chooseRegion }}</h5>
					<h6>Regional center : {{ regionData[chooseRegion].capital }}</h6>
					<p>Total cases: <span>{{ formatNum(Object.keys(regionData[chooseRegion].data).length) }}</span></p>

					<div class="row">
						<div v-for="(item, index) in regionData[chooseRegion].data" :key="index" class="patient_profile col-md-6" style="margin-bottom: 15px">
							<div class="bg-success d-flex">
								<div><img :src="`/images/${item.sex}.png`" width="90" /></div>
								<ul>
									<li class="d-flex"><p class="mb-0">Case code</p><span> {{ item.case_code }}</span></li>
									<li class="d-flex"><p class="mb-0">Age</p><span> {{ item.age ==  0 ? 'For validation' : item.age }}</span></li>
									<li class="d-flex"><p class="mb-0">Gender</p><span> {{ gender(item.sex) }}</span></li>
									<li class="d-flex"><p class="mb-0">Location</p><span> {{ item.location == 'For Validation, For Validation' ? 'For Validation' : item.location }}</span></li>
									<li class="d-flex"><p class="mb-0">Date died</p><span> {{ item.date_died }}</span></li>
									<li class="d-flex"><p class="mb-0">Date reported</p><span> {{ item.date_reported == 'Invalid Date' ? 'Not specified' : item.date_reported }}</span></li>
									<li class="d-flex"><p class="mb-0">Date recovered</p><span> {{ item.recovered_on }}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	// import SearchCountry from './SearchCountry.vue'
	export default{
		name: 'RegionData',
		// components: 'SearchCountry',
		data() {
			return{
				loading: true,
				fetching: true,
				chooseRegion: 'CARAGA',
				regionData: {
					'Region I: Ilocos Region': { capital: 'San Fernando (La Union)', data: []},
					'Region II: Cagayan Valley': { capital: 'Tuguegarao', data: []},
					'Region III: Central Luzon': { capital: 'San Fernando (Pampanga)', data: []},
					'Region IV-A: CALABARZON': { capital: 'Calamba', data: []},
					'Region IV-B: MIMAROPA': { capital: 'Calapan', data: []},
					'Region V: Bicol Region': { capital: 'Legazpi', data: []},
					'Region VI: Western Visayas': { capital: 'Iloilo City', data: []},
					'Region VII: Central Visayas': { capital: 'Cebu City', data: []},
					'Region VIII: Eastern Visayas': { capital: 'Tacloban', data: []},
					'Region IX: Zamboanga Peninsula': { capital: 'Pagadian', data: []},
					'Region X: Northern Mindanao': { capital: 'Cagayan de Oro', data: []},
					'Region XI: Davao Region': { capital: 'Davao City', data: []},
					'Region XII: SOCCSKSARGEN': { capital: 'Koronadal', data: []},
					'CARAGA': { capital: 'Butuan', data: []},
					'NCR': { capital: 'Manila', data: []},
					'CAR': { capital: 'Baguio', data: []},
					'BARMM': { capital: 'Cotabato City', data: []},
				}
			}
		},
		methods: {
			loadMore: function() {
				this.busy = true;
				setTimeout(() => {
					for (var i = 0, j = 10; i < j; i++) {
						this.data.push({ name: this.count++ });
					}
					this.busy = false;
				}, 1000);
				console.log('test');
			},
			async filterRegion(region) {
				this.chooseRegion = region;
			},
			async phByRegion() {
				let response = await axios.get('https://coronavirus-ph-api.herokuapp.com/doh-data-drop/');
				let regionArray = this.regionData;
				Object.keys(regionArray).forEach(function(key) {
					let response_data = response.data.data;
					for (var j = 0; j < response_data.length; j++) {
						if (response_data[j].region_res == key) {
							let elem = {
								"case_code": response_data[j].case_code,
								"age": response_data[j].age,
								"sex": response_data[j].sex,
								"date_reported": response_data[j].date_reported,
								"date_died": response_data[j].date_died,
								"recovered_on": response_data[j].recovered_on,
								"location": response_data[j].location
							};
							regionArray[key].data.push(elem);
						}
					}
				});
				this.loading = false;
				this.fetching = false;
			},
			gender(gender) {
				if (gender == 'M') { return 'Male';
				} else if (gender == 'F') { return 'Female';
				} else { return 'Not specified'; }
			},
			scroll() {
				window.onscroll = () => {
					let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
					if (bottomOfWindow) {
						// console.log('test');
					}
				};
			},
		},
		created() {
			this.phByRegion();
			this.filterRegion('CARAGA');
		}
	}
</script>