<script setup>
import Button from 'primevue/button';
</script>

<template>
  <Button severity="secondary" @click="logout">Logout</Button>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { logout } = useAuth0();

    return {
      logout: () => {
        console.log('logout')
        logout({ logoutParams: { returnTo: window.location.origin } });
      },
    };
  },
}
</script>

<style scoped>
/* button {
  margin: 10px;
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  border: 1px solid var(--tml-orange);
} */
</style>