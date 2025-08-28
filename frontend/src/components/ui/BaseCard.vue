<script setup lang="ts">
interface Props {
  hover?: boolean;
  clickable?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<Props>(), {
  hover: false,
  clickable: false,
});
</script>

<template>
  <div
    :class="[
      'base-card',
      {
        'base-card--hover': hover,
        'base-card--clickable': clickable,
      },
    ]"
    v-bind="$attrs"
  >
    <div v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </div>

    <div class="base-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  background: $white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow;
  overflow: hidden;
  transition: all 0.2s ease;

  &--hover:hover {
    box-shadow: $shadow-md;
    transform: translateY(-1px);
  }

  &--clickable {
    cursor: pointer;
  }

  &__header {
    padding: $spacing-6 $spacing-6 0 $spacing-6;
    border-bottom: 1px solid $gray-200;
    margin-bottom: $spacing-6;
    padding-bottom: $spacing-6;
  }

  &__body {
    padding: $spacing-6;
  }

  &__footer {
    padding: 0 $spacing-6 $spacing-6 $spacing-6;
    border-top: 1px solid $gray-200;
    margin-top: $spacing-6;
    padding-top: $spacing-6;
  }

  // Adjust padding when header exists
  &__header + &__body {
    padding-top: 0;
  }

  // Adjust padding when footer exists
  &__body:has(+ &__footer) {
    padding-bottom: 0;
  }
}
</style>
