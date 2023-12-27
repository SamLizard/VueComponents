<template>
  <div>
    <date-picker-usage />
    <time-picker-usage />
    <language-selection />
    <popup-structure ref="testPopup" :title="$t('popup')" :proceed="proceed">
      <template v-slot:content>
        <div class="mb-5">
          <v-icon class="my-5" size="5rem">add</v-icon>
        </div>
      </template>
    </popup-structure>
    <v-btn @click="$refs.testPopup.show()" :title="$t('regularPopup')">{{$t("show")}}</v-btn>
    <v-btn @click="openSweetalert" :title="$t('sweetalertPopup')">{{$t("show")}}</v-btn>
  </div>
</template>

<script>
import DatePickerUsage from "../componentsUsages/DatePickerUsage.vue";
import TimePickerUsage from "../componentsUsages/TimePickerUsage.vue";
import LanguageSelection from "../components/LanguageSelection.vue";
import PopupStructure from "../components/PopupStructure.vue";

export default {
  name: "ComponentsView",
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
      alert("You made it!");
    },
    openSweetalert() {
      this.$swal
        .fire({
          title: this.$t("confirmationQuestion"),
          // text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `${this.$t("proceed")}`,
          cancelButtonText: `${this.$t("cancel")}`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
              title: this.$t("deleted") + "!",
              text: this.$t("deletedFileMessage"),
              icon: "success",
              confirmButtonText: this.$t("ok"),
            });
          }
        });
    },
  },
  computed: {},
};
</script>
