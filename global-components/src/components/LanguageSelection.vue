<template>
  <div>
    <v-select
      :items="otherLocales"
      item-text="text"
      item-value="lang"
      v-model="$i18n.locale"
      flat
      solo
    >
      <template v-slot:selection="{ item }">
        <v-img
          :src="require('@/assets/flags/' + item.lang + '.svg')"
          min-width="50px"
          max-width="50px"
        />
        <div class="mx-2">
          {{ $t("language") }}
        </div>
      </template>
      <template v-slot:item="{ item }">
        <v-img
          :src="require('@/assets/flags/' + item.lang + '.svg')"
          min-width="50px"
          max-width="50px"
        />
        <div class="mx-2">
          {{ item.text }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "LanguageSelection",
  data() {
    return {};
  },
  methods: {},
  computed: {
    otherLocales() {
      return Object.keys(this.$i18n.messages).map((lang) => {
        return { lang: lang, text: this.$t("language", lang) };
      });
    },
  },
};
</script>
