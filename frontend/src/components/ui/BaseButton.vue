<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  loading: false,
  disabled: false,
});
</script>

<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'base-button--loading': loading,
        'base-button--disabled': disabled,
      },
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="base-button__spinner">⟳</span>
    <span :class="{ 'base-button__content--hidden': loading }">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: $border-radius;
  font-weight: $font-weight-medium;
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    outline: 2px solid $primary-light;
    outline-offset: 2px;
  }

  &--disabled,
  &--loading {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Variants
  &--primary {
    background-color: $primary;
    color: $white;
    border-color: $primary;

    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: $primary-dark;
      border-color: $primary-dark;
    }
  }

  &--secondary {
    background-color: $gray-600;
    color: $white;
    border-color: $gray-600;

    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: $gray-700;
      border-color: $gray-700;
    }
  }

  &--outline {
    background-color: transparent;
    color: $primary;
    border-color: $primary;

    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: $primary;
      color: $white;
    }
  }

  &--ghost {
    background-color: transparent;
    color: $primary;
    border-color: transparent;

    &:hover:not(.base-button--disabled):not(.base-button--loading) {
      background-color: $primary-light;
      color: $primary-dark;
    }
  }

  // Sizes
  &--small {
    padding: $spacing-2 $spacing-3;
    font-size: $font-size-sm;
  }

  &--medium {
    padding: $spacing-3 $spacing-4;
    font-size: $font-size-base;
  }

  &--large {
    padding: $spacing-4 $spacing-6;
    font-size: $font-size-lg;
  }

  // Loading spinner
  &__spinner {
    position: absolute;
    animation: spin 1s linear infinite;
  }

  &__content--hidden {
    opacity: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
