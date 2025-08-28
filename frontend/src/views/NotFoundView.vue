<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';

const router = useRouter();

const goBack = (): void => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

<template>
  <div class="not-found-view">
    <div class="not-found-view__container">
      <div class="not-found-view__content">
        <h1 class="not-found-view__title">404</h1>
        <h2 class="not-found-view__subtitle">Page Not Found</h2>
        <p class="not-found-view__description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="not-found-view__actions">
          <RouterLink to="/">
            <BaseButton size="large"> Go Home </BaseButton>
          </RouterLink>
          <BaseButton variant="outline" size="large" @click="goBack"> Go Back </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $gray-50 0%, $white 100%);
  padding: $spacing-4;

  &__container {
    text-align: center;
    max-width: 500px;
  }

  &__title {
    font-size: 4rem;
    font-weight: $font-weight-bold;
    color: $primary;
    line-height: 1;
    margin-bottom: $spacing-4;

    @media (min-width: $breakpoint-sm) {
      font-size: 6rem;
    }
  }

  &__subtitle {
    font-size: $font-size-2xl;
    font-weight: $font-weight-semibold;
    color: $gray-900;
    margin-bottom: $spacing-4;

    @media (min-width: $breakpoint-sm) {
      font-size: $font-size-3xl;
    }
  }

  &__description {
    font-size: $font-size-base;
    color: $gray-600;
    margin-bottom: $spacing-8;
    line-height: 1.6;

    @media (min-width: $breakpoint-sm) {
      font-size: $font-size-lg;
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-4;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @media (min-width: $breakpoint-sm) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
