export default {
  name: "validationRulesMixin",
  data() {
    return {
      requiredFieldRule: [
        (v) => !!v || this.$t("fieldRequired"),
      ],
      usernameLengthRules: [
        (v) => (v && v.length >= 3 && v.length <= 16) || this.$t("usernameLengthMessage"),
      ],
      passwordLengthRules: [
        (v) => (v && v.length >= 8 && v.length <= 64) || this.$t("passwordLengthMessage"),
      ],
      phoneRules: [
        (v) => (v && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v)) || this.$t("phoneIncorrectMessage"),
      ],
      alphanumericRule: (field="default") => [
        (v) => (/^\w+$/).test(v) || this.$t("noAlphanumericMessage", {fieldName: this.$t("field." + field)}),
      ],
      oneLetterRule: (field="default") => [
        (v) => (/[a-zA-Z]/).test(v) || this.$t("noLetterMessage", {fieldName: this.$t("field." + field)}),
      ],
      uppercaseRule: (field="default") => [
        (v) => (/[A-Z]/).test(v) || this.$t("noUpperCaseMessage", {fieldName: this.$t("field." + field)}),
      ],
      lowercaseRule: (field="default") => [
        (v) => (/[a-z]/).test(v) || this.$t("noLowerCaseMessage", {fieldName: this.$t("field." + field)}),
      ],
      digitRule: (field="default") => [
        (v) => (/[0-9]/).test(v) || this.$t("noDigitMessage", {fieldName: this.$t("field." + field)}),
      ],
      specialCharRule: (field="default") => [
        (v) => (/[^a-zA-Z0-9]/).test(v) || this.$t("noSpecialCharMessage", {fieldName: this.$t("field." + field)}),
      ],
    };
  },
};