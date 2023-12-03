<template>
  <div>
    <!-- <v-container>
    <v-row>
      <v-col cols="12" lg="6"> -->
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
          v-model="date"
          :label="label"
          :placeholder="placeholder"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          :value="computedDateFormatted"
          :disabled="disabled"
          :color="color"
          :background-color="bgColor"
          :rounded="rounded"
          :dense="dense"
          :solo="solo"
          :outlined="outlined"
          :filled="filled"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <!-- hint="MM/DD/YYYY format"
              persistent-hint -->
      </template>
      <v-date-picker
        v-model="date"
        @input="menu = false"
        no-title
        :locale="language"
        :first-day-of-week="languageFirstDayOfWeek"
        :min="min"
        :max="max"
        :allowed-dates="allowedDates"
      ></v-date-picker>
    </v-menu>
  </div>
  <!-- </v-col>
    </v-row>
  </v-container> -->
</template>

<script>
const languageSettings = {
  en: 0,
  he: 0,
  fr: 1,
};

export default {
  name: "DatePicker",
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "en",
    },
    color: {
      type: String,
      required: false,
    },
    bgColor: {
      type: String,
      required: false,
      // default: "warning",
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
    solo: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    min: {
      type: String,
      required: false,
      // default: (new Date()).toISOString().substr(0, 10)
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
    rules: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: Date,
      menu: false,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    languageFirstDayOfWeek() {
      return languageSettings[this.language] === undefined
        ? 0
        : languageSettings[this.language];
    },
  },
  watch: {
    date(val) {
      this.date = val;
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
