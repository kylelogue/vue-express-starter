<script setup lang="ts">
import { ref, reactive, computed, onMounted, type Ref, type ComputedRef } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { userService } from '@/services/user';
import AppHeader from '@/components/layout/AppHeader.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
}

interface ProfileErrors {
  firstName: string;
  lastName: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ApiError {
  status?: number;
  message?: string;
}

const authStore = useAuthStore();

// Profile form
const profileForm: ProfileForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
});

const profileErrors: ProfileErrors = reactive({
  firstName: '',
  lastName: '',
});

const profileLoading: Ref<boolean> = ref(false);
const profileMessage: Ref<string> = ref('');
const profileError: Ref<string> = ref('');

// Password form
const passwordForm: PasswordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordErrors: PasswordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordLoading: Ref<boolean> = ref(false);
const passwordMessage: Ref<string> = ref('');
const passwordError: Ref<string> = ref('');

// Initialize profile form with current user data
onMounted(() => {
  if (authStore.user) {
    profileForm.firstName = authStore.user.firstName;
    profileForm.lastName = authStore.user.lastName;
    profileForm.email = authStore.user.email;
  }
});

const hasProfileChanges: ComputedRef<boolean> = computed(() => {
  if (!authStore.user) return false;
  return (
    profileForm.firstName !== authStore.user.firstName ||
    profileForm.lastName !== authStore.user.lastName
  );
});

const resetProfileForm = (): void => {
  if (authStore.user) {
    profileForm.firstName = authStore.user.firstName;
    profileForm.lastName = authStore.user.lastName;
  }
  Object.keys(profileErrors).forEach(key => {
    profileErrors[key as keyof ProfileErrors] = '';
  });
  profileMessage.value = '';
  profileError.value = '';
};

const resetPasswordForm = (): void => {
  Object.keys(passwordForm).forEach(key => {
    passwordForm[key as keyof PasswordForm] = '';
  });
  Object.keys(passwordErrors).forEach(key => {
    passwordErrors[key as keyof PasswordErrors] = '';
  });
  passwordMessage.value = '';
  passwordError.value = '';
};

const validateProfileForm = (): boolean => {
  Object.keys(profileErrors).forEach(key => {
    profileErrors[key as keyof ProfileErrors] = '';
  });

  let isValid = true;

  if (!profileForm.firstName.trim()) {
    profileErrors.firstName = 'First name is required';
    isValid = false;
  }

  if (!profileForm.lastName.trim()) {
    profileErrors.lastName = 'Last name is required';
    isValid = false;
  }

  return isValid;
};

const validatePasswordForm = (): boolean => {
  Object.keys(passwordErrors).forEach(key => {
    passwordErrors[key as keyof PasswordErrors] = '';
  });

  let isValid = true;

  if (!passwordForm.currentPassword) {
    passwordErrors.currentPassword = 'Current password is required';
    isValid = false;
  }

  if (!passwordForm.newPassword) {
    passwordErrors.newPassword = 'New password is required';
    isValid = false;
  } else if (passwordForm.newPassword.length < 6) {
    passwordErrors.newPassword = 'New password must be at least 6 characters';
    isValid = false;
  }

  if (!passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Please confirm your new password';
    isValid = false;
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  return isValid;
};

const handleUpdateProfile = async (): Promise<void> => {
  if (!validateProfileForm()) return;

  profileLoading.value = true;
  profileMessage.value = '';
  profileError.value = '';

  try {
    const response = await userService.updateProfile({
      firstName: profileForm.firstName.trim(),
      lastName: profileForm.lastName.trim(),
    });

    // Update the auth store with new user data
    authStore.updateUser(response.user);

    profileMessage.value = 'Profile updated successfully';
  } catch (error) {
    const apiError = error as ApiError;
    profileError.value = apiError.message || 'Failed to update profile';
  } finally {
    profileLoading.value = false;
  }
};

const handleChangePassword = async (): Promise<void> => {
  if (!validatePasswordForm()) return;

  passwordLoading.value = true;
  passwordMessage.value = '';
  passwordError.value = '';

  try {
    await userService.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    passwordMessage.value = 'Password changed successfully';
    resetPasswordForm();
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.status === 400) {
      passwordError.value = 'Current password is incorrect';
    } else {
      passwordError.value = apiError.message || 'Failed to change password';
    }
  } finally {
    passwordLoading.value = false;
  }
};
</script>

<template>
  <div class="profile-view">
    <AppHeader />

    <main class="profile-view__main">
      <div class="container">
        <div class="profile-view__header">
          <h1 class="profile-view__title">Profile Settings</h1>
          <p class="profile-view__subtitle">Manage your account information and preferences</p>
        </div>

        <div class="profile-view__content">
          <BaseCard class="profile-view__card">
            <template #header>
              <h3>Personal Information</h3>
            </template>

            <form @submit.prevent="handleUpdateProfile" class="profile-view__form">
              <BaseInput
                v-model="profileForm.firstName"
                label="First Name"
                placeholder="Enter your first name"
                :error="profileErrors.firstName"
                required
              />

              <BaseInput
                v-model="profileForm.lastName"
                label="Last Name"
                placeholder="Enter your last name"
                :error="profileErrors.lastName"
                required
              />

              <BaseInput
                v-model="profileForm.email"
                label="Email"
                type="email"
                disabled
                hint="Email cannot be changed"
              />

              <div class="profile-view__actions">
                <BaseButton type="submit" :loading="profileLoading" :disabled="!hasProfileChanges">
                  Update Profile
                </BaseButton>
                <BaseButton
                  type="button"
                  variant="outline"
                  @click="resetProfileForm"
                  :disabled="!hasProfileChanges"
                >
                  Cancel
                </BaseButton>
              </div>

              <div
                v-if="profileMessage"
                class="profile-view__message profile-view__message--success"
              >
                {{ profileMessage }}
              </div>

              <div v-if="profileError" class="profile-view__message profile-view__message--error">
                {{ profileError }}
              </div>
            </form>
          </BaseCard>

          <BaseCard class="profile-view__card">
            <template #header>
              <h3>Change Password</h3>
            </template>

            <form @submit.prevent="handleChangePassword" class="profile-view__form">
              <BaseInput
                v-model="passwordForm.currentPassword"
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
                :error="passwordErrors.currentPassword"
                required
              />

              <BaseInput
                v-model="passwordForm.newPassword"
                label="New Password"
                type="password"
                placeholder="Enter your new password (min. 6 characters)"
                :error="passwordErrors.newPassword"
                required
              />

              <BaseInput
                v-model="passwordForm.confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder="Confirm your new password"
                :error="passwordErrors.confirmPassword"
                required
              />

              <div class="profile-view__actions">
                <BaseButton type="submit" :loading="passwordLoading"> Change Password </BaseButton>
                <BaseButton type="button" variant="outline" @click="resetPasswordForm">
                  Clear
                </BaseButton>
              </div>

              <div
                v-if="passwordMessage"
                class="profile-view__message profile-view__message--success"
              >
                {{ passwordMessage }}
              </div>

              <div v-if="passwordError" class="profile-view__message profile-view__message--error">
                {{ passwordError }}
              </div>
            </form>
          </BaseCard>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.profile-view {
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

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-6;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: $spacing-8;
    }
  }

  &__card {
    height: fit-content;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__actions {
    display: flex;
    gap: $spacing-3;
    margin-top: $spacing-2;
    flex-direction: column;

    @media (min-width: $breakpoint-sm) {
      flex-direction: row;
    }
  }

  &__message {
    padding: $spacing-3;
    border-radius: $border-radius;
    text-align: center;
    font-size: $font-size-sm;
    margin-top: $spacing-4;

    &--success {
      background-color: rgba(16, 185, 129, 0.1);
      color: $success;
    }

    &--error {
      background-color: rgba(239, 68, 68, 0.1);
      color: $error;
    }
  }
}
</style>
