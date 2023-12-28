<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="title">
        <strong>{{ $t("title") }}</strong>
      </div>
      <div class="links">
        <v-btn
          v-for="route in $router.getRoutes()"
          v-show="showRoute(route)"
          :key="route.path"
          :color="route.path === $router.currentRoute.path ? 'primary' : ''"
          :to="route.path"
        >
          {{ $t("routes." + route.name) }}
        </v-btn>
      </div>
      <div class="user-info">
        <div v-if="isLoggedIn" class="user">
          <v-icon>person</v-icon>
          {{ $t("salutation") }} {{ $store.getters.GET_USER_ID }}
        </div>
        <div v-if="isLoggedIn" class="information">
          <v-icon @click="showUserInfo">info</v-icon>
        </div>
        <language-selection class="language-selection" />
        <div v-if="isLoggedIn" class="logout" @click="$emit('logout')">
          <v-icon :title="$t('logout')">input</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSelection from "./LanguageSelection.vue";
const allowedRoutes = ["home", "login", "register"];

export default {
  name: "Navbar",
  components: { LanguageSelection },
  props: {
    personalDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    showRoute(route) {
      return this.isLoggedIn
        ? !allowedRoutes.includes(route.name) || route.name === "home"
        : allowedRoutes.includes(route.name);
    },
    encodeHTML(str) {
      var elem = document.createElement("div");
      elem.innerText = str;
      return elem.innerHTML;
    },
    showUserInfo() {
      let details = "";
      Object.entries(this.personalDetails).forEach(([key, value]) => {
        details += this.$t("details." + key) + ": " + this.encodeHTML(value) + "<br />";
      });
      this.$swal.fire({
        title: this.$t("details.title"),
        html: '<pre>' + details + '</pre>',
        icon: "info",
        confirmButtonText: this.$t("ok"),
      });
    },
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
  background-color: #f2f2f2; /*#f8f9fa;*/
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
  flex: 8;
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
.information,
.logout,
.language-selection {
  display: flex;
  align-items: center;
}

.user {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
