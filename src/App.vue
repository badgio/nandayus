<template>
  <v-app
    class = "app"
  >
    <Navbar />
  	<v-container
      class = "container"
    >
      <router-view
        class = "router"
      >
      </router-view>
  	</v-container>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

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

<style scoped>

.app {
  align-items: center;
  font-family: 'Roboto';
}

.router {
  margin: 0px 50px 150px 50px;
  width: max;
}

.container {
  max-width: 95%;
  padding: 0;
  align-self: center;
}

</style>
