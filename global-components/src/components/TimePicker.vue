<template>
  <div class="time-picker-root">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-bind="[$attrs, attrs]"
          v-model="time"
          :value="time"
          append-icon="mdi-clock-time-four-outline"
          readonly
          v-on="on"
          :rounded="rounded"
          :dense="dense"
          :outlined="outlined"
          hide-details="auto"
        >
          <template v-if="iconColor !== undefined" v-slot:append>
            <v-icon :color="iconColor">access_time</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-time-picker
        v-if="menu"
        v-model="time"
        full-width
        :no-title="!withTitle"
        @change="close"
        @click:minute="close"
        :allowed-hours="allowedHours"
        :allowed-minutes="allowedMinutes"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {  
  name: "TimePicker",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "12:00",
    },
    withTitle: {
      type: Boolean,
      default: false,
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
      default: "00:00",
    },
    max: {
      type: String,
      required: false,
      default: "23:59",
    },
    every: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      time: "",
      menu: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.time = newVal;
      },
    },
  },
  methods: {
    close() {
      this.$refs.menu.save(this.time);
      this.$emit("input", this.time);
      this.menu = false;
    },
    allowedHours(value) {
      if (this.authorizedMinutes.includes(0)) {
        return value >= this.min.substring(0, 2) && value <= this.max.substring(0, 2);
      }
      return value > this.min.substring(0, 2) && value < this.max.substring(0, 2);
    },
    allowedMinutes(value) {
      return this.authorizedMinutes.includes(value) && 
            (this.value.substring(0, 2) < this.max.substring(0, 2) || value <= this.max.substring(3, 5)) &&
            (this.value.substring(0, 2) > this.min.substring(0, 2) || value >= this.min.substring(3, 5))
    },
  },
  computed: {
    authorizedMinutes() {
      const minMinutes = parseInt(this.min.substring(3, 5));
      return Array.from({length: 60 / this.every}, (_, index) => (minMinutes + index * this.every) % 60);
    },
  },
};
</script>

<style>
</style>