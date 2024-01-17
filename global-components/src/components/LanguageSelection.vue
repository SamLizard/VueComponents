<template>
  <div>
    <v-select
      :items="otherLocales"
      item-text="text"
      item-value="lang"
      v-model="$i18n.locale"
      hide-details="auto"
      flat
      solo
      background-color="transparent"
      type="hide"
    >
      <template v-slot:selection="{ item }">
        <v-img
          :src="require('@/assets/flags/' + item.lang + '.svg')"
          min-width="50px"
          max-width="50px"
        />
        <div :class="'m' + ($t('dir') === 'ltr' ? 'l' : 'r') + '-2'">
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

<script lang="ts">
interface LocaleItem {
 lang: string;
 text: string;
}

export default {
  name: "LanguageSelection",
  data() {
    return {};
  },
  methods: {},
  computed: {
    otherLocales(): LocaleItem[] {
      return Object.keys(this.$i18n.messages).map((lang) => {
        return { lang: lang, text: this.$t("language", lang) as string };
      });
    },
  },
};
</script>
<style scoped>
.v-select /deep/ .v-select__selections input {
    display: none;
}

.v-text-field /deep/ .v-input__append-inner {
  padding: 0 !important;
}
</style>