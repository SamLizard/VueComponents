<template>
  <div align="center" class="mt-8">
    <user-filter @filter="updatefilters"></user-filter>
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      hide-default-footer
      disable-pagination
      class="itemTable component"
      :key="$i18n.locale"
    >
      <template
        v-for="header in headers"
        v-slot:[`header.${header.value}`]="{ header }"
      >
        <span>{{ $t(header.text) }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="deleteItem(item)" class="me-2" :title="$t('cancel')">
          delete
        </v-icon>
      </template>
      <template v-slot:[`item.itemDate`]="{ item }">
        <tr>
          <td>
            {{ formatDate(item.itemDate) }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getItems, deleteItem } from "../DL/DL.js";
import UserFilter from "../components/UserFilter.vue";

const dateFormatOptions = { year: "numeric", month: "numeric", day: "numeric" };

export default {
  name: "DisplaySearchView",
  components: { UserFilter },
  data() {
    return {
      items: [],
      headers: [],
      currentTimePrecision: null,
      filters: {
        startDate: "",
        endDate: "",
        startTime: "00:00",
        endTime: "23:59",
      },
      filteredItems: [],
    };
  },
  async created() {
    this.loadHeaders();

    try {
      this.items = await getItems();
      this.removeTimeLeading();
      this.items = this.items.map((item) => ({
        ...item,
        itemDate: this.parseDate(item.itemDate),
      }));
      this.filteredItems = this.items;
    } catch (err) {
      this.$swal.fire({
        icon: "error",
        title: err.message,
        confirmButtonText: this.$t("ok"),
      });
    }
  },
  methods: {
    loadHeaders() {
      this.headers = [
        { text: "date", value: "itemDate", sortable: true },
        { text: "time", value: "itemTime", sortable: true },
        { value: "actions", sortable: false },
      ];
    },
    updatefilters(filters) {
      this.filters = filters;
      this.filter();
    },
    filter() {
      this.filteredItems = this.items.filter((item) => {
        return (
          item.itemDate.toISOString().substring(0, 10) >=
            this.filters.startDate &&
          item.itemDate.toISOString().substring(0, 10) <=
            this.filters.endDate &&
          this.timeToMillis(item.itemTime) >=
            this.timeToMillis(this.filters.startTime) &&
          this.timeToMillis(item.itemTime) <=
            this.timeToMillis(this.filters.endTime)
        );
      });
    },
    removeTimeLeading() {
      let maxPrecision = 0; // 0 means no seconds or milliseconds, 1 means seconds, 2 means milliseconds

      this.items.forEach((item) => {
        let timeParts = item.itemTime
          .split(/:|\./)
          .map((part) => parseInt(part));
        if (timeParts.length > 3 && timeParts[3] !== 0) {
          maxPrecision = 2;
        } else if (timeParts.length > 2 && timeParts[2] !== 0) {
          maxPrecision = 1;
        }
      });

      if (this.currentTimePrecision === maxPrecision) {
        return;
      }

      this.currentTimePrecision = maxPrecision;

      // Add leading zeros to the hours, minutes, and seconds (if necessary)
      for (let i = 0; i < this.items.length; i++) {
        let timeParts = this.items[i].itemTime
          .split(/:|\./)
          .map((part) => parseInt(part));
        if (maxPrecision === 2 && timeParts.length <= 3) {
          timeParts[3] = 0;
        }
        if (maxPrecision >= 1 && timeParts.length <= 2) {
          timeParts[2] = 0;
        }
        if (maxPrecision === 0 && timeParts.length > 2) {
          timeParts.splice(2, 2); // remove seconds
        }

        // Pad each part with zeroes until it reaches the desired length
        timeParts = timeParts.map((part, index) =>
          String(part).padStart(index < 3 ? 2 : 4, "0")
        );

        // Join the time parts back together
        if (timeParts.length === 4) {
          this.items[i].itemTime = [
            timeParts.slice(0, 3).join(":"),
            "." + timeParts[3],
          ].join("");
        } else {
          this.items[i].itemTime = timeParts.join(":");
        }
      }
    },
    async deleteItem(item) {
      try {
        const deleted = await deleteItem(item.itemDate, item.itemTime, item.id);
        if (deleted) {
          this.items = this.items.filter((curr) => curr.id !== item.id);
          this.removeTimeLeading();
          this.filter();
          this.$swal.fire({
            title: this.$t("deleted") + "!",
            text: this.$t("deletedItemMessage", {
              itemName: this.$t("item.item"),
            }),
            icon: "success",
            confirmButtonText: this.$t("ok"),
          });
        }
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: err.message,
          confirmButtonText: this.$t("ok"),
        });
      }
    },
    parseDate(dateStr) {
      let [day, month, year] = dateStr.split(".").map(Number);
      return new Date(year, month - 1, day);
    },
    formatDate(date) {
      return date.toLocaleDateString(this.$i18n.locale, dateFormatOptions);
    },
    timeToMillis(time) {
      const parts = time.split(/:|\./).map(Number);
      let hours = parts[0] || 0;
      let minutes = parts[1] || 0;
      let seconds = parts[2] || 0;
      let milliseconds = parts[3] || 0;
      return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
    },
  },
  computed: {},
};
</script>
<style scoped>
.itemTable {
  width: 95%;
}
</style>