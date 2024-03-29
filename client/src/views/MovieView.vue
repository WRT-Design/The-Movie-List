<script setup>
import NavC from "../components/NavC.vue";
import { ref } from "vue";
</script>

<template>
  <main>
    <NavC />
    <div class="main">
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-12 d-flex p-2">
              <img
                v-if="movie.primaryImage"
                :src="movie.primaryImage.url"
                :alt="movie.primaryImage.caption.plainText"
                width="25%"
                height="auto"
              />
              <img
                v-else
                src="@/assets/no-poster.png"
                width="25%"
                height="auto"
                class="p-2"
              />
              <section class="px-2">
                <h2>{{ movie.titleText.text }}</h2>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      movie: ref(""),
    };
  },
  async beforeMount() {
    try {
      const response = await fetch(
        `https://moviesdatabase.p.rapidapi.com/titles/${this.$route.params.movieId}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.VUE_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        }
      ).then((res) => res.json());
      this.movie = response.results;
      console.log(this.movie);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped></style>
