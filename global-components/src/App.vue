<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {
    '$i18n.locale': function() {
      const newDirection = this.$t('dir') === 'rtl'
      if (newDirection !== this.$vuetify.rtl) {
        this.$vuetify.rtl = newDirection;
      }
    }
  }
}
</script>
