<template>
  <div>
    <date-picker-usage />
    <time-picker-usage />
    <language-selection />
  </div>
</template>

<script>
import DatePickerUsage from "../componentsUsages/DatePickerUsage.vue";
import TimePickerUsage from "../componentsUsages/TimePickerUsage.vue";
import LanguageSelection from "../components/LanguageSelection.vue";

export default {
  name: "ComponentsView",
  components: {
    DatePickerUsage,
    TimePickerUsage,
    LanguageSelection,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
