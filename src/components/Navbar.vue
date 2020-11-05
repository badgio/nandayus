<template>
  <div>
    <v-toolbar 
    color = "teal lighten-5"
    height = 60px
    > 
        <v-toolbar-items
        class = "hidden-md-and-down"
        >
            <v-btn
            class = "ma-2"
            outlined
            color = "#546E7A"
            max-height = 40px
            v-for="item in menu"
            :key="item.index"
            flat
            large
            >
                <router-link
                :to=item.link
                tag = "span"
                >
                    {{item.title}}
                </router-link>
            </v-btn>
        </v-toolbar-items>
        <v-menu
        offset-y
        >
            <template v-slot:activator="{ on }">
                <v-btn
                class = "ma-2 hidden-lg-and-up"
                rounded
                max-height = 40px
                v-on = on
                >
                <v-icon>
                    mdi-menu
                </v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                v-for="item in menu"
                :key="item.index"
                >
                <router-link
                :to=item.link
                tag="span"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </router-link>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-spacer></v-spacer>
        <v-toolbar-title
        color = "dark"
        >
            <v-btn @click="signOut">Sign out</v-btn>
        </v-toolbar-title>
    </v-toolbar>
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
                title : "Sign-up",
                link : "/signup"
            },
            {
                title : "Sign-in",
                link : "/signin"
            },
            {
                title : "Consultar perfil",
                link : "/profile"
            },
            {
                title : "Alterar Pedido",
                link : "/change"
            },
            {
                title : "Cancelar Pedido",
                link : "/cancel"
            }
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
      console.log("signouttt")
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    }
  }
};

</script>


<style scoped>

.v-btn {
    width : max;
    height : max;
}

</style>