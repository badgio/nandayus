<template>
  <div
    class="app"
  >
    <Navbar
      class="navbar"
    />
    <div
      class="container"
    >
      <div
        class="table_cell"
      >
        <router-view
          class="router"
          :key="$route.path"
        >
        </router-view>
      </div>
    </div>
    <Footer
      class="footer"
    />
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Vue from 'vue';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect)

export default {
  name: 'App',

  components: {
    Navbar,
    Home,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>

<style>


html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app {
  align-items: center;
  font-family: 'Roboto';
  width: 100%;
  height: 100%;
  display:table;
}

.navbar {
  margin: 0px;
}

.container {
  display: table-row;
  height: 100%;
  max-width: 50%;
  margin: 0 auto;
}

.table_cell {
  display: table-cell;
  background-color: #FFFBF1;
}

.router {
  margin: 60px auto 100px;
  width: 90%;  
  font-size: 18px;
}

.footer {
  width: 100%;
  height: 50px;
}

</style>
