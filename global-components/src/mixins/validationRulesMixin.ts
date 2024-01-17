import Vue from "vue";

export default Vue.extend({
  name: "validationRulesMixin",
  data() {
    return {
      requiredFieldRule: [
        (v: string): string | boolean => !!v || this.$t("fieldRequired") as string,
      ],
      usernameLengthRules: [
        (v: string): string | boolean => (v && v.length >= 3 && v.length <= 16) || this.$t("usernameLengthMessage") as string,
      ],
      passwordLengthRules: [
        (v: string): string | boolean => (v && v.length >= 8 && v.length <= 64) || this.$t("passwordLengthMessage") as string,
      ],
      phoneRules: [
        (v: string): string | boolean => (v && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v)) || this.$t("phoneIncorrectMessage") as string,
      ],
      alphanumericRule: (field="default") => [
        (v: string): string | boolean => (/^\w+$/).test(v) || this.$t("noAlphanumericMessage", {fieldName: this.$t("field." + field)}) as string,
      ],
      oneLetterRule: (field="default") => [
        (v: string): string | boolean => (/[a-zA-Z]/).test(v) || this.$t("noLetterMessage", {fieldName: this.$t("field." + field)}) as string,
      ],
      uppercaseRule: (field="default") => [
        (v: string): string | boolean => (/[A-Z]/).test(v) || this.$t("noUpperCaseMessage", {fieldName: this.$t("field." + field)}) as string,
      ],
      lowercaseRule: (field="default") => [
        (v: string): string | boolean => (/[a-z]/).test(v) || this.$t("noLowerCaseMessage", {fieldName: this.$t("field." + field)}) as string,
      ],
      digitRule: (field="default") => [
        (v: string): string | boolean => (/[0-9]/).test(v) || this.$t("noDigitMessage", {fieldName: this.$t("field." + field)}) as string,
      ],
      specialCharRule: (field="default") => [
        (v: string): string | boolean => (/[^a-zA-Z0-9]/).test(v) || this.$t("noSpecialCharMessage", {fieldName: this.$t("field." + field)}) as string,
      ],
    };
  },
});