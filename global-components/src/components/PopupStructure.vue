<template>
  <v-dialog
    v-model="isVisible"
    v-bind="$attrs"
    v-on="$listeners"
    @keydown.enter="hide"
    justify="center"
    :max-width="dialogMaxWidth"
    :color="dialogColor"
  >
    <v-card class="text-center">
      <v-card-title>
        <slot name="title">
          <div class="headline flex-grow-1" :style="{ color: titleColor }">
            {{ title }}
          </div>
          <v-icon v-if="showCloseIcon" left large color="black" @click="hide"
            >close</v-icon
          >
        </slot>
      </v-card-title>
      <hr />
      <v-card-text>
        <component :is="contentComponent" v-bind="contentProps"></component>
      </v-card-text>
      <v-card-actions>
        <slot name="actions">
          <v-spacer />
          <v-btn :color="cancelButtonColor" text @click="hide"
            >{{ $t("cancel") }}
          </v-btn>
          <v-btn
            v-show="proceed !== undefined"
            :color="proceedButtonColor"
            text
            @click="proceed"
            >{{ $t("proceed") }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PopupStructure",
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    proceed: {
      type: Function,
      required: false,
    },
    cancelButtonColor: {
      type: String,
      default: "red",
    },
    proceedButtonColor: {
      type: String,
      default: "green darken-1",
    },
    dialogMaxWidth: {
      type: String,
      default: "50%",
    },
    dialogColor: {
      type: String,
      default: "white",
    },
    titleColor: {
      type: String,
      default: "black",
    },
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
    contentComponent: {
      type: Object,
      default: null,
    },
    contentProps: {
      type: Object,
      default: null,
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
  // setup(props, ctx) {
  //   const parentSlots = computed(() => Object.keys(ctx.slots));
  //   return { parentSlots };
  // },
};
</script>
<style scoped>
.v-dialog {
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.v-card {
  padding: 20px;
}

.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-card-text {
  margin-top: 20px;
}

.v-card-actions {
  margin-top: 20px;
}
</style>
