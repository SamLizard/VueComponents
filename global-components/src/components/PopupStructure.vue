<template>
  <v-dialog
    v-model="isVisible"
    @keydown.enter="hide"
    justify="center"
    max-width="50%"
  >
    <v-card class="text-center">
      <v-card-title>
        <div class="headline flex-grow-1">{{ title }}</div>
        <v-icon left large color="black" @click="hide">close</v-icon>
      </v-card-title>
      <hr />
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red" text @click="hide">{{ $t("cancel") }}</v-btn>
        <v-btn
          v-show="proceed !== undefined"
          color="green darken-1"
          text
          @click="proceed"
          >{{ $t("proceed") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PopupStructure",
  props: {
    title: {
      type: String,
      required: true,
    },
    proceed: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
  },
};
</script>