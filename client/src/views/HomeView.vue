<script setup>
import MovieTable from "../components/MovieTable.vue";
import NavC from "../components/NavC.vue";

import { ref } from "vue";
</script>

<template>
  <main class="min-h-screen flex relative lg:static">
    <NavC :user="user || {}" />
    <div class="main min-h-screen flex flex-column relative flex-auto">
      <section class="homeHeader">
        <h1>The Movie List</h1>
        <h2 v-if="auth">Welcome back {{ user.name }}</h2>
      </section>
      <section class="">
        <MovieTable table-type="movie" />
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      auth: ref(this.$auth0.isAuthenticated),
      user: ref(this.$auth0.user),
    };
  },
  async beforeMount() {
    // use this to check if a user is already logged in
    console.log('before mount')
    console.log('this.auth: ', this.$auth0.isAuthenticated)
    if (this.auth) {
      const userExists = await fetch(`/api/api/user/${this.user.nickname}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (userExists.status != 200) {
        await fetch(`api/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: this.user.nickname,
              first_name: this.user.name,
              email: this.user.email,
            },
          }),
        });
      }
    }
  },
  methods: {
    authCheck() {
      console.log("user: ", this.user);
    },
  },
};
</script>

<style scoped>
.homeHeader {
  text-align: center;
}


/* .theMovieList table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
}

.theMovieList th,
.theMovieList td {
  border: 1px solid #ddd;
  padding: 10px;
} */

.navWrapper {
  border: solid 3px var(--tml-orange);
  min-height: 100vh;
  position: fixed;
  padding: 3rem;
  width: 25%;
}

.navWrapper,
nav {
  display: flex;
  flex-direction: column;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 1rem;
}
</style>
