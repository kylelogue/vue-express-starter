<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseButton from '@/components/ui/BaseButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async (): Promise<void> => {
  try {
    await authStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__brand">
        <RouterLink to="/" class="app-header__logo"> Vue Express Starter </RouterLink>
      </div>

      <nav class="app-header__nav">
        <template v-if="authStore.isAuthenticated">
          <RouterLink to="/dashboard" class="app-header__link"> Dashboard </RouterLink>
          <RouterLink to="/profile" class="app-header__link"> Profile </RouterLink>
          <BaseButton
            variant="ghost"
            size="small"
            @click="handleLogout"
            :loading="authStore.loading"
          >
            Logout
          </BaseButton>
        </template>
        <template v-else>
          <RouterLink to="/login" class="app-header__link"> Login </RouterLink>
          <RouterLink to="/register" class="app-header__link"> Register </RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: $white;
  border-bottom: 1px solid $gray-200;
  box-shadow: $shadow-sm;

  &__container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  &__brand {
    flex-shrink: 0;
  }

  &__logo {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $primary;
    text-decoration: none;

    &:hover {
      color: $primary-dark;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
  }

  &__link {
    color: $gray-600;
    text-decoration: none;
    font-weight: $font-weight-medium;
    border-radius: $border-radius;
    transition: all 0.2s ease;

    &:hover {
      color: $primary;
      background-color: $gray-50;
    }

    &.router-link-active {
      color: $primary;
      background-color: $primary-light;
    }
  }
}

// Mobile responsive
.app-header {
  &__container {
    padding: 0 $spacing-3;

    @media (min-width: $breakpoint-sm) {
      padding: 0 $spacing-4;
    }
  }

  &__nav {
    gap: $spacing-2;

    @media (min-width: $breakpoint-sm) {
      gap: $spacing-4;
    }
  }

  &__link {
    padding: $spacing-2;
    font-size: $font-size-sm;

    @media (min-width: $breakpoint-sm) {
      padding: $spacing-2 $spacing-3;
      font-size: $font-size-base;
    }
  }
}
</style>
