<template>
  <div>
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
          v-model="time"
          :value="time"
          :label="label"
          append-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
          :placeholder="placeholder"
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
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  props: {
    value: {
      type: String,
      default: '12:00',
    },
    withTitle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconColor: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    bgColor: {
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
    rules: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      time: '',
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
  },
};
</script>

<style>
</style>