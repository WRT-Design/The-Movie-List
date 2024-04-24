<!-- <script setup>
import { useAuthStore } from '@/stores/AuthStore'
</script> -->

<template>
  <Button severity="secondary" label="Login" icon="pi pi-sign-in" @click="login" />
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue';


export default {
  setup() {
    // const store = useStore(this.$pinia)
    // console.log(store)

    // // const store = useAuthStore()

    // console.log(store.user)

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
.p-button-label {
  background-color: red;
}
</style>
