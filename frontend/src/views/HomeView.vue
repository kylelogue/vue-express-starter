<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
</script>

<template>
  <div class="home-view">
    <AppHeader />

    <main class="home-view__main">
      <section class="home-view__hero">
        <div class="container">
          <div class="home-view__hero-content">
            <h1 class="home-view__title">Vue Express Starter</h1>
            <p class="home-view__subtitle">
              A modern full-stack starter template with Vue 3, Express.js, Prisma, and PostgreSQL
            </p>
            <div class="home-view__actions">
              <RouterLink to="/register">
                <BaseButton size="large"> Get Started </BaseButton>
              </RouterLink>
              <RouterLink to="/login">
                <BaseButton variant="outline" size="large"> Sign In </BaseButton>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <section class="home-view__features">
        <div class="container">
          <h2 class="home-view__features-title">What's Included</h2>
          <div class="home-view__features-grid">
            <BaseCard class="home-view__feature">
              <h3>🚀 Vue 3 + Composition API</h3>
              <p>Modern frontend with Vue 3, Vue Router, Pinia for state management</p>
            </BaseCard>
            <BaseCard class="home-view__feature">
              <h3>⚡ Express.js Backend</h3>
              <p>RESTful API with Express.js, JWT authentication, and middleware</p>
            </BaseCard>
            <BaseCard class="home-view__feature">
              <h3>🗄️ PostgreSQL + Prisma</h3>
              <p>Type-safe database operations with Prisma ORM</p>
            </BaseCard>
            <BaseCard class="home-view__feature">
              <h3>🐳 Docker Ready</h3>
              <p>Complete Docker setup for development and production</p>
            </BaseCard>
            <BaseCard class="home-view__feature">
              <h3>🔒 Authentication</h3>
              <p>JWT-based auth with refresh tokens and protected routes</p>
            </BaseCard>
            <BaseCard class="home-view__feature">
              <h3>📱 Mobile Friendly</h3>
              <p>Responsive design and mobile development workflow</p>
            </BaseCard>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, $gray-50 0%, $white 100%);

  &__main {
    padding-top: 0;
  }

  &__hero {
    padding: $spacing-16 0;
    text-align: center;

    @media (min-width: $breakpoint-md) {
      padding: $spacing-24 0;
    }
  }

  &__hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  &__title {
    font-size: 2rem;
    font-weight: $font-weight-bold;
    color: $gray-900;
    margin-bottom: $spacing-6;

    @media (min-width: $breakpoint-sm) {
      font-size: 2.5rem;
    }

    @media (min-width: $breakpoint-md) {
      font-size: 3.5rem;
    }
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: $gray-600;
    margin-bottom: $spacing-8;
    line-height: 1.6;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-xl;
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-4;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__features {
    padding: $spacing-16 0;
    background: $white;

    @media (min-width: $breakpoint-md) {
      padding: $spacing-20 0;
    }
  }

  &__features-title {
    text-align: center;
    font-size: $font-size-2xl;
    color: $gray-900;
    margin-bottom: $spacing-8;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-3xl;
      margin-bottom: $spacing-12;
    }
  }

  &__features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-4;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: $spacing-6;
    }
  }

  &__feature {
    text-align: center;

    h3 {
      font-size: $font-size-lg;
      margin-bottom: $spacing-3;
      color: $gray-900;
    }

    p {
      color: $gray-600;
      line-height: 1.6;
      margin-bottom: 0;
    }
  }
}
</style>
