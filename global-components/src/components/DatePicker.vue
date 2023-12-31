<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-bind="[$attrs, attrs]"
          append-icon="mdi-calendar"
          readonly
          v-on="on"
          :value="computedDateFormatted"
          :rounded="rounded"
          :dense="dense"
          :outlined="outlined"
          hide-details="auto"
        >
          <template v-if="iconColor !== undefined" v-slot:append>
            <v-icon :color="iconColor">event</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="close"
        no-title
        :locale="language"
        :first-day-of-week="languageFirstDayOfWeek"
        :min="min"
        :max="max"
        :allowed-dates="allowedDates"
        :show-adjacent-months="showAdjacentMonths"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
const languageSettings = {
  en: 0,
  he: 0,
  fr: 1,
};

export default {
  name: "DatePicker",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: new Date().toISOString().substring(0, 10),
    },
    language: {
      type: String,
      default: "en",
    },
    showAdjacentMonths: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    min: {
      type: String,
      required: false,
      // default: (new Date()).toISOString().substring(0, 10)
    },
    max: {
      type: String,
      required: false,
      default: "9999-01-01", // use toISOString on js date
    },
    allowedDates: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      date: new Date().toISOString().substring(0, 10),
      dateFormatted: Date,
      menu: false,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    languageFirstDayOfWeek() {
      return languageSettings[this.language] ?? 0; // take it from i18n
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.date = newVal;
        this.dateFormatted = this.formatDate(this.date);
      },
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    close() {
      this.$emit("input", this.date);
      this.menu = false;
    },
  },
};
</script>
