<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AppHeader from '@/components/layout/AppHeader.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const authStore = useAuthStore();

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const daysAgo = computed(() => {
  if (!authStore.user?.createdAt) return 0;
  const createdDate = new Date(authStore.user.createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});
</script>

<template>
  <div class="dashboard-view">
    <AppHeader />

    <main class="dashboard-view__main">
      <div class="container">
        <div class="dashboard-view__header">
          <h1 class="dashboard-view__title">Welcome back, {{ authStore.userFullName }}!</h1>
          <p class="dashboard-view__subtitle">Here's what's happening with your account today.</p>
        </div>

        <div class="dashboard-view__grid">
          <BaseCard class="dashboard-view__card">
            <template #header>
              <h3>Account Info</h3>
            </template>
            <div class="dashboard-view__info">
              <div class="dashboard-view__info-item">
                <span class="dashboard-view__info-label">Email:</span>
                <span class="dashboard-view__info-value">{{ authStore.user?.email }}</span>
              </div>
              <div class="dashboard-view__info-item">
                <span class="dashboard-view__info-label">Role:</span>
                <span class="dashboard-view__info-value">{{ authStore.user?.role }}</span>
              </div>
              <div class="dashboard-view__info-item">
                <span class="dashboard-view__info-label">Member since:</span>
                <span class="dashboard-view__info-value">{{
                  formatDate(authStore.user?.createdAt)
                }}</span>
              </div>
            </div>
            <template #footer>
              <RouterLink to="/profile">
                <BaseButton variant="outline" size="small"> Edit Profile </BaseButton>
              </RouterLink>
            </template>
          </BaseCard>

          <BaseCard class="dashboard-view__card">
            <template #header>
              <h3>Quick Stats</h3>
            </template>
            <div class="dashboard-view__stats">
              <div class="dashboard-view__stat">
                <div class="dashboard-view__stat-value">1</div>
                <div class="dashboard-view__stat-label">Account</div>
              </div>
              <div class="dashboard-view__stat">
                <div class="dashboard-view__stat-value">0</div>
                <div class="dashboard-view__stat-label">Projects</div>
              </div>
              <div class="dashboard-view__stat">
                <div class="dashboard-view__stat-value">{{ daysAgo }}</div>
                <div class="dashboard-view__stat-label">Days Active</div>
              </div>
            </div>
          </BaseCard>

          <BaseCard class="dashboard-view__card dashboard-view__card--full">
            <template #header>
              <h3>Getting Started</h3>
            </template>
            <div class="dashboard-view__checklist">
              <div class="dashboard-view__checklist-item dashboard-view__checklist-item--completed">
                <span class="dashboard-view__checkmark">✓</span>
                <span>Create your account</span>
              </div>
              <div class="dashboard-view__checklist-item">
                <span class="dashboard-view__checkmark">○</span>
                <span>Update your profile information</span>
              </div>
              <div class="dashboard-view__checklist-item">
                <span class="dashboard-view__checkmark">○</span>
                <span>Explore the application features</span>
              </div>
              <div class="dashboard-view__checklist-item">
                <span class="dashboard-view__checkmark">○</span>
                <span>Customize your settings</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-view {
  min-height: 100vh;
  background: $gray-50;

  &__main {
    padding: $spacing-6 0;

    @media (min-width: $breakpoint-md) {
      padding: $spacing-8 0;
    }
  }

  &__header {
    margin-bottom: $spacing-6;
    text-align: center;

    @media (min-width: $breakpoint-md) {
      margin-bottom: $spacing-8;
    }
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin-bottom: $spacing-2;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-3xl;
    }
  }

  &__subtitle {
    color: $gray-600;
    font-size: $font-size-lg;
    margin-bottom: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-4;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: $spacing-6;
    }
  }

  &__card {
    &--full {
      grid-column: 1 / -1;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__info-label {
    color: $gray-600;
    font-weight: $font-weight-medium;
  }

  &__info-value {
    color: $gray-900;
    font-weight: $font-weight-medium;
  }

  &__stats {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__stat {
    text-align: center;

    &-value {
      font-size: $font-size-3xl;
      font-weight: $font-weight-bold;
      color: $primary;
      line-height: 1.2;
    }

    &-label {
      color: $gray-600;
      font-size: $font-size-sm;
      margin-top: $spacing-1;
    }
  }

  &__checklist {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__checklist-item {
    display: flex;
    align-items: center;
    gap: $spacing-3;
    padding: $spacing-3;
    border-radius: $border-radius;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $gray-50;
    }

    &--completed {
      .dashboard-view__checkmark {
        background-color: $success;
        color: $white;
      }

      span:last-child {
        color: $gray-500;
        text-decoration: line-through;
      }
    }
  }

  &__checkmark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: $gray-200;
    color: $gray-400;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    flex-shrink: 0;
  }
}
</style>
