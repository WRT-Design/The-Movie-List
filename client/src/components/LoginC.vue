<!-- <script setup>
import { useAuthStore } from '@/stores/AuthStore'
</script> -->

<template>
  <Button severity="primary" label="Login" icon="pi pi-sign-in" @click="login" />
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useAuthStore } from '@/stores/auth-store';


export default {
  setup() {
    const store = useAuthStore()

    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    return {
      login: () => {
        console.log('login')
        loginWithRedirect()
      },
      user,
      isAuthenticated,
    };

  },
}
</script>

<style scoped>
.p-menuitem-link span,
.p-button span,
.p-column-header-content span,
.p-button-label {
  margin: 3px;
}
</style>
