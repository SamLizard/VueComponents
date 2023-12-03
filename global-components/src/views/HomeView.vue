<template>
  <div>
    <date-picker-usage />
    <time-picker-usage />
  </div>
</template>

<script>
import DatePickerUsage from "../componentsUsages/DatePickerUsage.vue";
import TimePickerUsage from "../componentsUsages/TimePickerUsage.vue";

export default {
  name: "HomeView",
  components: {
    DatePickerUsage,
    TimePickerUsage,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
