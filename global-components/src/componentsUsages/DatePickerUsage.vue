<template>
  <v-container>
    <v-row>
      <v-col cols="4" lg="3">
        <date-picker
          v-model="date"
          :allowedDates="isAllowedDate"
          :rules="requiredRules"
          iconColor="#53A5EB"
          :language="this.$i18n.locale"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatePicker from "../components/DatePicker.vue";
// const allowedDaysInWeek = { 'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRY': 5, 'SAT': 6 };
const allowedDaysInWeek = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4 };

export default {
  name: "DatePickerUsage",
  components: {
    DatePicker,
  },
  data() {
    return {
      date: new Date().toISOString().substring(0, 10),
      requiredRules: [(v) => !!v || "required"],
    };
  },
  methods: {
    isAllowedDate(dateString) {
      const date = new Date(dateString);
      const dayOfWeek = date.getDay();

      return Object.values(allowedDaysInWeek).includes(dayOfWeek);
    },
  },
};
</script>
