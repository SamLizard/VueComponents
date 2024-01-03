<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{ $t("routes.register") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-account-plus</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="userDetails.username"
                :rules="[requiredFieldRule, usernameLengthRules, alphanumericRule('username'), oneLetterRule('username')].flat()"
                :label="$t('username')"
                required
                prepend-inner-icon="mdi-account-outline"
              ></v-text-field>
              <v-text-field
                v-model="userDetails.phone"
                :rules="[requiredFieldRule, phoneRules].flat()"
                :label="$t('phone')"
                required
                prepend-inner-icon="mdi-cellphone"
              ></v-text-field>
              <v-text-field
                v-model="userDetails.password"
                :rules="[requiredFieldRule, passwordLengthRules, uppercaseRule('password'), lowercaseRule('password'), digitRule('password'), specialCharRule('password')].flat()"
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
                      >{{ $t("routes.register") }}</v-btn
                    >
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      text
                      class="lowercase"
                      color="primary"
                      to="login"
                      >{{ $t("loginQuestion") }}</v-btn
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
import { register } from "../DL/DL.js";
import validationRulesMixin from '../mixins/validationRulesMixin';

export default {
  name: "RegisterView",
  components: {},
  mixins: [validationRulesMixin],
  data() {
    return {
      userDetails: { username: "", password: "", phone: "" },
      showPassword: false,
      valid: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        await this.register();
      }
    },
    async register() {
      const personalDetails = await register(this.userDetails.username, this.userDetails.password, this.userDetails.phone);
      if (Object.keys(personalDetails).length > 0) {
        this.$store.dispatch("changeUserId", this.userDetails.username);
        this.$emit('connected', personalDetails);
        this.$router.push("home");
      } else {
        this.$swal.fire({
          icon: "error",
          title: this.$t("registerFailed"),
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