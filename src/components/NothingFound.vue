<template>
	<div class="d-flex flex-column align-items-center container">
		<p class="mt-5 text-center">Sorry the page you requested is not found.</p>
		<router-link to="/covid-19" class="btn btn-success mb-2">Back to Covid-19 bulletin</router-link>
		<img alt="Vue logo" src="../assets/404.png">
	</div>
</template>

<script>
	export default{
		name:'NothingFound'
	}
</script>