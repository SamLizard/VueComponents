<template>
  <div v-if="isLoggedIn" class="navbar">
    <div class="navbar-content">
      <div class="title">
        <strong>{{ $t("title") }}</strong>
      </div>
      <div class="links">
        <v-btn
          v-for="route in this.$router.getRoutes()"
          :key="route.path"
          :color="route.path === $router.currentRoute.path ? 'primary' : ''"
          :to="route.path"
        >
          {{ $t("routes." + route.name) }}
        </v-btn>
      </div>
      <div class="user-info">
        <div class="user">
          <v-icon>person</v-icon>
          {{ $t("salutation") }} {{ $store.getters.GET_USER_ID }}
        </div>
        <language-selection class="language-selection" />
        <div class="logout" @click="$emit('logout')">
          <v-icon :title="$t('logout')">input</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSelection from "./components/LanguageSelection.vue";
export default {
  components: { LanguageSelection },
  name: "Navbar",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("changeUserId", 404);
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.GET_USER_ID !== undefined;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background-color: #F2F2F2; /*#f8f9fa;*/
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.title {
  flex: 2;
}

.links {
  flex: 10;
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  padding-left: 20px;
}

.user-info {
  flex: 3;
  display: flex;
  justify-content: space-evenly;
}

.user,
.logout,
.language-selection {
  display: flex;
  align-items: center;
}

.language-selection {
  max-width: 200px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

button.active {
  color: blue;
}
</style>
