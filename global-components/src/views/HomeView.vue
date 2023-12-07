<template>
  <div>
    <date-picker-usage />
    <time-picker-usage />
    <language-selection />
    <popup-structure ref="testPopup" title="Popup" :proceed="proceed">
      <template v-slot:content>
        <div class="mb-5">
          <v-icon class="my-5" size="5rem">add</v-icon>
        </div>
      </template>
    </popup-structure>
    <v-btn @click="$refs.testPopup.show()">show</v-btn>
  </div>
</template>

<script>
import DatePickerUsage from "../componentsUsages/DatePickerUsage.vue";
import TimePickerUsage from "../componentsUsages/TimePickerUsage.vue";
import LanguageSelection from "../components/LanguageSelection.vue";
import PopupStructure from '../components/PopupStructure.vue';

export default {
  name: "HomeView",
  components: {
    DatePickerUsage,
    TimePickerUsage,
    LanguageSelection,
    PopupStructure,
  },
  data() {
    return {};
  },
  methods: {
    proceed() {
      alert('You made it!');
    },
  },
  computed: {},
};
</script>
