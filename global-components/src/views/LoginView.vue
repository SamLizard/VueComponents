<!-- <template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-card-title>
            <v-icon large>mdi-login</v-icon>
            <h1 class="headline">{{$t('routes.login')}}</h1>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                :label="$t('username')"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :label="$t('password')"
                required
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="primary"
                  @click="submitForm"
                  >{{$t('routes.login')}}</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template> -->
<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{ $t("routes.login") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-login</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :rules="[requiredFieldRule, usernameLengthRules].flat()"
                :label="$t('username')"
                required
                prepend-inner-icon="mdi-account-outline"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="[requiredFieldRule, passwordLengthRules].flat()"
                :label="$t('password')"
                required
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>
              <v-card-actions>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      type="submit"
                      :disabled="!valid"
                      color="primary"
                      @click="submitForm"
                      >{{ $t("routes.login") }}</v-btn
                    >
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      text
                      class="lowercase"
                      color="primary"
                      to="register"
                      >{{ $t("registerQuestion") }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { login } from "../DL/DL.js";
import validationRulesMixin from "../mixins/validationRulesMixin.js";

export default {
  name: "LoginView",
  components: {},
  mixins: [validationRulesMixin],
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      valid: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        await this.checkLogin();
      }
    },
    async checkLogin() {
      const personalDetails = await login(this.username, this.password);
      if (Object.keys(personalDetails).length > 0) {
        this.$store.dispatch("changeUserId", this.username);
        this.$emit("connected", personalDetails);
        this.$router.push("home");
      } else {
        this.$swal.fire({
          icon: "error",
          title: this.$t("loginFailed"),
          showCloseButton: true,
          confirmButtonText: this.$t("ok"),
        });
      }
    },
  },
  watch: {
    "$i18n.locale": function (newVal, oldVal) {
      if (Object.entries(this.$refs.form.errorBag).length > 0) {
        this.$refs.form.validate();
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lowercase {
  font-size: 0.8rem;
  text-transform: none;
}
</style>