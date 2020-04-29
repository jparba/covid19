<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <headerComponent/>
    <p class="container text-center mt-4">{{ date }}</p>
    <router-view></router-view>
    <!-- <Footer/> -->
  </div>
</template>

<script>
  // import Footer from './components/Footer.vue'
  import headerComponent from './components/headerComponent.vue'
export default {
  data() {
    return {
      date: '',
    }
  },
  name: 'App',
  components: {
    // Footer,
    headerComponent,
  },
  methods: {
    getCurrentDateTime() {
        const today = new Date();
        const monthName = today.toLocaleString('default', { month: 'long',  });
        const weekday = ' | '+today.toLocaleString('default', { weekday: 'long' });
        const date = monthName+' '+today.getDate()+','+today.getFullYear();
        const time = today.toLocaleString('default', { hour: 'numeric', minute: 'numeric', second: 'numeric' ,hour12: true });
        return this.date = 'Today : '+date+' '+ weekday + ' ' + time;

    },
    blinkDateTime() {
      setInterval( this.getCurrentDateTime, 1000);
    },
  },
  mounted() {
    this.blinkDateTime();
  },
}
</script>

<style lang="scss">
  @import './src/assets/app.scss';
</style>
