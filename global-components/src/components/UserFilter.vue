<template>
  <div class="mb-10" align="center">
    <div class="component pb-8">
      <h1 class="mb-2 pt-5">{{ $t('filterTitle') }}</h1>
      <v-row justify="center" style="max-height: 50%">
        <v-col cols="3" class="offset-md-3">
          <h2>{{ $t("from") }}</h2>
        </v-col>
        <v-col cols="3" class="offset-md-1">
          <h2>{{ $t("to") }}</h2>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="offset-md-1">
          <h2>{{ $t("date") }}</h2>
        </v-col>
        <v-col cols="3" class="offset-md-1">
          <DatePicker
            v-model="filters.startDate"
            :max="filters.endDate"
            iconColor="#53A5EB"
            :language="this.$i18n.locale"
            solo
            readonly
          ></DatePicker>
        </v-col>
        <v-col cols="3" class="offset-md-1">
          <DatePicker
            v-model="filters.endDate"
            :min="filters.startDate"
            iconColor="#53A5EB"
            :language="this.$i18n.locale"
            solo
            readonly
          ></DatePicker>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col cols="1" class="offset-md-1">
          <h2>{{ $t("time") }}</h2>
        </v-col>
        <v-col cols="3" class="offset-md-1">
          <TimePicker
            v-model="filters.startTime"
            :max="filters.endTime"
            iconColor="#53A5EB"
            solo
            readonly
          ></TimePicker>
        </v-col>
        <v-col cols="3" class="offset-md-1">
          <TimePicker
            v-model="filters.endTime"
            :min="filters.startTime"
            iconColor="#53A5EB"
            solo
            readonly
          ></TimePicker>
        </v-col>
        <v-col cols="2">
          <v-btn type="submit" color="primary" @click="$emit('filter', filters)"
            >{{$t('filter')}}<v-icon :class="this.$vuetify.rtl ? 'pr-1' : 'pl-1'">filter_list</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";

let nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);
nextMonth = nextMonth.toISOString().substring(0, 10);

export default {
  name: "UserFilter",
  components: {
    DatePicker,
    TimePicker,
  },
  data() {
    return {
      filters: {
        startDate: new Date().toISOString().substring(0, 10),
        endDate: nextMonth,
        startTime: "00:00",
        endTime: "23:59",
      },
    };
  },
  methods: {},
  computed: {},
};
</script>
<style scoped>
div.component {
  width: 95%;
}
</style>
