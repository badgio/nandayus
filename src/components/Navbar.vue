<template>
  <div>
    <div class="nav">
      <input type="checkbox" id="nav-check">
      <div class="nav-header">
        <div class="nav-title">
          <a>
            <router-link
              to="/"
              tag="span"
            >
              Badgio
            </router-link>
          </a>
        </div>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div v-if="user.loggedIn" class="nav-links">
        <router-link
          class="router_link"
          :to=item.link
          v-for="item in menu_admin"
          :key="item.index"
        >
          <a>
            {{item.title[selected_language]}}
          </a>
        </router-link>
           <a href="" @click="signOut()">
            {{language.sign_out[selected_language]}}
          </a>
      </div>
      <div v-else class="nav-links">
        <router-link
          class="router_link"
          :to=item.link
          v-for="item in menu_front_page"
          :key="item.index"
        >
          <a>
            {{item.title[selected_language]}}
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  name : "Navbar",
    data :() => ({
        language:{
          sign_out: {
            en: 'Sign Out',
            pt: 'Terminar Sessão',
          }
        },  
        menu_admin : [
            {
              title: {
                en: 'Badges',
                pt: 'Badges',
              },
              link : "/badges"
            },
            {
              title: {
                en: "Collections",
                pt: 'Coleções',
              },
              link: '/collections'
            },
            {
              title: {
                en: "Locations",
                pt: 'Locais',
              },
              link : "/locations"
            },
        ],
        menu_manager : [
            {
              title: {
                en: "Locations",
                pt: 'Locais',
              },
              link : "/locations"
            },
        ],
        menu_promoter : [
            {
              title: {
                en: 'Badges',
                pt: 'Badges',
              },
              link : "/badges"
            },
            {
              title: {
                en: "Collections",
                pt: 'Coleções',
              },
              link: '/collections'
            },
        ],
        menu_front_page : [
            {
              title: {
                en: "Sign Up",
                pt: 'Registo',
              },
              link : "/signup"
            },
            {
              title: {
                en: "Sign In",
                pt: 'Iniciar Sessão',
              },
              link: "/signin"
            },
        ],
    }),
    computed: {
      selected_language() {
          return this.$store.getters.getLanguage;
      },
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

* {
  box-sizing: border-box;
}

.nav {
  height: 50px;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  height: 50px;
  text-decoration: none;
  color: #efefef;
  cursor: pointer;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

/*
.nav > .nav-links > a > span.router-link {
    width: 100%;
    margin: 0 auto;
  }
*/

.nav > #nav-check {
  display: none;
}

.router_link {
  color: white;
  text-decoration: none;
}

@media (max-width:700px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a,
  .nav > .nav-links > a > .router_link {
    display: block;
    width: 100%;
  }

  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: 250px;
    overflow-y: auto;
  }
}


</style>