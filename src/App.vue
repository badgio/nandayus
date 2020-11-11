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
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  margin: 15px auto 50px;
  width: 85%;
  background-color: #fafafa;
  border: 1px solid #999;
  border-radius: 5px;
  font-size: 18px;
}

.container {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  height: 100%;
  max-width: 100%;
  padding: 0;
  align-self: center;
  background-color: #f9f9f9;
}

</style>
