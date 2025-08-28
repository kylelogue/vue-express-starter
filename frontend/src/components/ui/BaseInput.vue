<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

interface Props {
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

interface Emits {
  (_e: 'update:modelValue', _value: string): void;
  (_e: 'blur', _event: FocusEvent): void;
  (_e: 'focus', _event: FocusEvent): void;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  type: 'text',
  placeholder: '',
  error: '',
  hint: '',
  required: false,
  disabled: false,
  id: '',
});

defineEmits<Emits>();

const inputId: ComputedRef<string> = computed(
  () => props.id || `input-${Math.random().toString(36).substr(2, 9)}`
);
</script>

<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>

    <div class="base-input__wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'base-input__field',
          {
            'base-input__field--error': error,
            'base-input__field--disabled': disabled,
          },
        ]"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </div>

    <p v-if="error" class="base-input__error">{{ error }}</p>
    <p v-else-if="hint" class="base-input__hint">{{ hint }}</p>
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  &__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $gray-700;
    margin-bottom: $spacing-2;
  }

  &__required {
    color: $error;
  }

  &__wrapper {
    position: relative;
  }

  &__field {
    width: 100%;
    padding: $spacing-3;
    border: 1px solid $gray-300;
    border-radius: $border-radius;
    font-size: $font-size-base;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: $gray-400;
    }

    &--error {
      border-color: $error;

      &:focus {
        border-color: $error;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }

    &--disabled {
      background-color: $gray-100;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__error {
    margin-top: $spacing-1;
    font-size: $font-size-sm;
    color: $error;
  }

  &__hint {
    margin-top: $spacing-1;
    font-size: $font-size-sm;
    color: $gray-500;
  }
}
</style>
