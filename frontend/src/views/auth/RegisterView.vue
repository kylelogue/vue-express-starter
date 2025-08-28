<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiError {
  status?: number;
  message?: string;
}

const router = useRouter();
const authStore = useAuthStore();

const form: RegisterForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errors: RegisterErrors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errorMessage: Ref<string> = ref('');

const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof RegisterErrors] = '';
  });
  errorMessage.value = '';

  let isValid = true;

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required';
    isValid = false;
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  }

  if (!form.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Please enter a valid email';
    isValid = false;
  }

  if (!form.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
    isValid = false;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) return;

  try {
    await authStore.register({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      password: form.password,
    });

    router.push('/dashboard');
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 409) {
      errorMessage.value = 'An account with this email already exists';
    } else {
      errorMessage.value = apiError.message || 'An error occurred while creating your account';
    }
  }
};
</script>

<template>
  <div class="register-view">
    <div class="register-view__container">
      <BaseCard class="register-view__card">
        <div class="register-view__header">
          <h1 class="register-view__title">Create Account</h1>
          <p class="register-view__subtitle">Get started with your free account</p>
        </div>

        <form @submit.prevent="handleSubmit" class="register-view__form">
          <BaseInput
            v-model="form.firstName"
            label="First Name"
            placeholder="Enter your first name"
            :error="errors.firstName"
            required
          />

          <BaseInput
            v-model="form.lastName"
            label="Last Name"
            placeholder="Enter your last name"
            :error="errors.lastName"
            required
          />

          <BaseInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            :error="errors.email"
            required
          />

          <BaseInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Create a password (min. 6 characters)"
            :error="errors.password"
            required
          />

          <BaseInput
            v-model="form.confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            :error="errors.confirmPassword"
            required
          />

          <div class="register-view__actions">
            <BaseButton type="submit" size="large" :loading="authStore.loading" class="w-full">
              Create Account
            </BaseButton>
          </div>

          <div v-if="errorMessage" class="register-view__error">
            {{ errorMessage }}
          </div>
        </form>

        <div class="register-view__footer">
          <p>
            Already have an account?
            <RouterLink to="/login" class="register-view__link"> Sign in </RouterLink>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $gray-50 0%, $white 100%);
  padding: $spacing-4;

  &__container {
    width: 100%;
    max-width: 400px;
  }

  &__card {
    .base-card__body {
      padding: $spacing-8;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: $spacing-8;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin-bottom: $spacing-2;
  }

  &__subtitle {
    color: $gray-600;
    margin-bottom: 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__actions {
    margin-top: $spacing-2;
  }

  &__error {
    color: $error;
    text-align: center;
    font-size: $font-size-sm;
    margin-top: $spacing-4;
    padding: $spacing-3;
    background-color: rgba(239, 68, 68, 0.1);
    border-radius: $border-radius;
  }

  &__footer {
    text-align: center;
    margin-top: $spacing-6;
    color: $gray-600;

    p {
      margin-bottom: 0;
    }
  }

  &__link {
    color: $primary;
    font-weight: $font-weight-medium;

    &:hover {
      color: $primary-dark;
    }
  }
}
</style>
