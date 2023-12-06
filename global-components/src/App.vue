<template>
  <v-app>
    <navbar @logout="logout" :key="$router.currentRoute.fullPath" />
    <v-layout fill-height>
      <v-flex>
        <router-view />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch('changeUserId', undefined);
      if (this.$router.currentRoute.path !== '/*') {
        this.$router.push('');
      }
    },
  },
  computed: {},
  watch: {
    '$i18n.locale': function () {
      const newDirection = this.$t('dir') === 'rtl';
      if (newDirection !== this.$vuetify.rtl) {
        this.$vuetify.rtl = newDirection;
      }
    },
  },
};
</script>
