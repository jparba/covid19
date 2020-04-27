<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <headerComponent/>
    <p class="container text-center mt-4">{{ date }}</p>
    <!-- <SearchCountry/> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import headerComponent from './components/headerComponent.vue'
  // import SearchCountry from './components/SearchCountry.vue'
export default {
  data() {
    return {
      date: '',
    }
  },
  name: 'App',
  components: {
    headerComponent,
    // SearchCountry,
  },
  methods: {
    getCurrentDateTime() {
        const today = new Date();
        const monthName = today.toLocaleString('default', { month: 'long',  });
        const weekday = ' | '+today.toLocaleString('default', { weekday: 'long' });
        const date = monthName+' '+today.getDate()+','+today.getFullYear();
        const time = today.toLocaleString('default', { hour: 'numeric', minute: 'numeric', second: 'numeric' ,hour12: true });
        // console.log(this.date = date+' '+ weekday + ' ' + time);
        // console.log(todayS);
        return this.date = 'Today : '+date+' '+ weekday + ' ' + time;

    },
    blinkDateTime() {
      setInterval( this.getCurrentDateTime, 1000);
    },
  },
  mounted() {
    this.blinkDateTime();
    // this.getTimezoneName();
    // this.getCurrentDateTime();
    // this.d();
  }
}
</script>

<style lang="scss">
  @import './src/assets/app.scss';
</style>
