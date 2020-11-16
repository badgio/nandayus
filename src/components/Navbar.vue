<template>
  <div>
    <ul>
      <li
        class="badgio"
      >
        <router-link
          class="router_link"
          to="/"
          tag="span"
        >
          Badgio
        </router-link>
      </li>
      <li
        v-for="item in menu"
        :key="item.index"
      >
        <router-link
          class="router_link"
          :to=item.link
          tag = "span"
        >
            {{item.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  name : "Navbar",
    data :() => ({
        menu : [
            {
              title: 'Sign Out',
              link: '/'
            },
            {
                title : "Sign Up",
                link : "/signup"
            },
            {
                title : "Sign In",
                link : "/signin"
            },
            {
                title : "Badges",
                link : "/badges"
            },
            {
                title : "Locations",
                link : "/locations"
            },
        ]
    }),
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      console.log("acedendo firebase")
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("log out")
          this.$router.replace({
            name: "Home"
          });
        });
    }
  }
};

</script>


<style scoped>

ul {
  list-style-type: none;
  margin: 0 auto;
  padding: 0px;
  overflow: hidden;
  height: 50px;
  background-color: #333;
}

li {
  float: right;
}

.badgio {
  float: left;
}

.router_link {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.router_link:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #4CAF50;
}

</style>