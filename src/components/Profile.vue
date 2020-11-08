<template>
    <div>
        <h1>
            Email: {{user.data.email}}
        </h1>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "consult",
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};
</script>