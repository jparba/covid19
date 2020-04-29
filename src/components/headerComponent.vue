<template>
  <div>
    <header class="posr z2">
      <div class="container d-flex">
        <h1 class="logo mb-0">Jparba</h1>
        <nav class="navbar ml-auto p-0">
            <ul class="d-flex ml-auto mb-0 pl-0">
              <li><router-link to="/covid-19">Home</router-link></li>
              <li><router-link to="/covid-19/credits">About</router-link></li>
            </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'headerComponent',
}
</script>

<style scoped>
</style>
