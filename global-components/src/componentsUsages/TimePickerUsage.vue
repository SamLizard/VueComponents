<template>
  <v-container>
    <v-row>
      <v-col cols="4" lg="3">
        <time-picker
          v-model="time"
          :time="time"
          :rules="requiredRules"
          iconColor="#53A5EB"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TimePicker from "../components/TimePicker.vue";

export default {
  name: "TimePickerUsage",
  components: {
    TimePicker,
  },
  data() {
    return {
      time: '00:00',
      requiredRules: [(v) => !!v || "required"],
    };
  },
  methods: {},
  computed: {},
};
</script>
