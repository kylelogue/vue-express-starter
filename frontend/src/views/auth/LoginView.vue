<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email: string;
  password: string;
}

interface ApiError {
  status?: number;
  message?: string;
}

const router = useRouter();
const authStore = useAuthStore();

const form: LoginForm = reactive({
  email: '',
  password: '',
});

const errors: LoginErrors = reactive({
  email: '',
  password: '',
});

const errorMessage: Ref<string> = ref('');

const validateForm = (): boolean => {
  errors.email = '';
  errors.password = '';
  errorMessage.value = '';

  let isValid = true;

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
  }

  return isValid;
};

const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) return;

  try {
    await authStore.login({
      email: form.email,
      password: form.password,
    });

    router.push('/dashboard');
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 401) {
      errorMessage.value = 'Invalid email or password';
    } else {
      errorMessage.value = apiError.message || 'An error occurred while signing in';
    }
  }
};
</script>

<template>
  <div class="login-view">
    <div class="login-view__container">
      <BaseCard class="login-view__card">
        <div class="login-view__header">
          <h1 class="login-view__title">Welcome Back</h1>
          <p class="login-view__subtitle">Sign in to your account</p>
        </div>

        <form @submit.prevent="handleSubmit" class="login-view__form">
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
            placeholder="Enter your password"
            :error="errors.password"
            required
          />

          <div class="login-view__actions">
            <BaseButton type="submit" size="large" :loading="authStore.loading" class="w-full">
              Sign In
            </BaseButton>
          </div>

          <div v-if="errorMessage" class="login-view__error">
            {{ errorMessage }}
          </div>
        </form>

        <div class="login-view__footer">
          <p>
            Don't have an account?
            <RouterLink to="/register" class="login-view__link"> Sign up </RouterLink>
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
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
