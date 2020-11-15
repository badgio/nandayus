<template>
  <div
    class="app"
  >
    <Navbar
      class="navbar"
    />
    <router-view
      class="router"
    >
    </router-view>
    <Footer
      class="footer"
    />
  </div>
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
  flex: 1;
  align-items: center;
  font-family: 'Roboto';
  width: 100%;
}

.navbar {
  padding-bottom: 10px;
  margin: 0px;
}

.router {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  height: 100%;
  width: 85%;
  background-color: #fafafa;
  border: 1px solid #999;
  border-radius: 5px;
  margin: 60px auto 50px;
  font-size: 18px;
}

.footer {
  position: fixed;
  bottom: 0;
  width:100%;
  margin-top: 90px;
  height:60px;
}

</style>
