export default {
  name: "validationRulesMixin",
  data() {
    return {
      usernameRules: [
        (v) => !!v || this.$t("fieldRequired"),
        (v) => (v && v.length <= 12) || this.$t("usernameLengthMessage"),
      ],
      passwordRules: [
        (v) => !!v || this.$t("fieldRequired"),
        (v) => (v && v.length <= 40) || this.$t("passwordLengthMessage"),
      ],
    };
  },
};