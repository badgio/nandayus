<template>
  <v-app>
    <Navbar />
  	<v-container>
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

.router {
  margin: 50px;
}

</style>
