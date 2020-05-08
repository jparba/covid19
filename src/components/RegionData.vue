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
					<select v-model="chooseRegion" class="form-control d-none">
						<option value="test">Choose region</option>
						<option v-for="(item, index) in regionData" :key="index" :value="item.region">{{ item.region }}</option>
					</select>
					<div class="region_list">
						<h4>List of Regions</h4>
						<ul>
							<li v-for="(item, index) in regionData" :key="index" @click="filterRegion(index)" :class="chooseRegion == item.region ? 'active': ''">{{ index }}</li>
						</ul>
					</div>
				</div>
				<div class="col-md-9">
					<h5 class="region_name">{{ regionData[chooseRegion].regionName }}</h5>
					<h6>Regional center : {{ regionData[chooseRegion].capital }}</h6>
					<p>Total cases: <span>{{ Object.keys(regionData[chooseRegion].data).length }}</span></p>

					<div v-for="(item, index) in regionData[chooseRegion].data" :key="index">
						<img :src="`../assets/${item.sex}.png`" alt="">
						<img src="`../assets/${item.sex}.png`" alt="">
						<img src="'/static/img/' + item.sex + '.png'">
						{{ item.case_code }}
						{{ item.age }}
						{{ item.sex }}
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
				chooseRegion: '8',
				img: "logo.png",
				regionData: {
					'Region I: Ilocos Region': { region: '1', regionName: 'Ilocos Region', capital: 'San Fernando (La Union)', data: []},
					'Region II: Cagayan Valley': { region: '2', regionName: 'Cagayan Valley', capital: 'Tuguegarao', data: []},
					'Region III: Central Luzon': { region: '3', regionName: 'Central Luzon', capital: 'San Fernando (Pampanga)', data: []},
					'Region IV-A: CALABARZON': { region: '4A', regionName: 'Calabarzon', capital: 'Calamba', data: []},
					'6': { region: '6', regionName: 'Western Visayas', capital: 'Iloilo City', data: []},
					'Region VII: Central Visayas': { region: '7', regionName: 'Central Visayas', capital: 'Cebu City', data: []},
					'8': { region: '8', regionName: 'Eastern Visayas', capital: 'Tacloban', data: []},
					'9': { region: '9', regionName: 'Zamboanga Peninsula', capital: 'Pagadian', data: []},
					'10': { region: '10', regionName: 'Northern Mindanao', capital: 'Cagayan de Oro', data: []},
					'11': { region: '11', regionName: 'Davao Region', capital: 'Davao City', data: []},
					'12': { region: '12', regionName: 'Soccsksargen', capital: 'Koronadal', data: []},
					'13': { region: '13', regionName: 'Caraga Region', capital: 'Butuan', data: []},
					'NCR': { region: 'NCR', regionName: 'National Capital Region', capital: 'Manila', data: []},
					'CAR': { region: 'CAR', regionName: 'Cordillera Administrative Region', capital: 'Baguio', data: []},
					'MIMAROPA': { region: 'MIMAROPA', regionName: 'Southwestern Tagalog Region', capital: 'Calapan', data: []},
					'BARMM': { region: 'BARMM', regionName: 'Bangsamoro Autonomous Region in Muslim Mindanao', capital: 'Cotabato City', data: []},
				}
			}
		},
		methods: {
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
		},
		created() {
			this.phByRegion();
		}
	}
</script>