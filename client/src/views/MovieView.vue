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
                <h2>{{ movie.titleText.text }} | 3.7 stars</h2>
                <section>
                  <b>Release Date: </b>
                  <span
                    v-if="
                      movie.releaseDate &&
                      movie.releaseDate.month &&
                      movie.releaseDate.day &&
                      movie.releaseDate.year
                    "
                  >
                    {{ getMonth(movie.releaseDate.month) }}
                    {{ movie.releaseDate.day }},
                    {{ movie.releaseDate.year }}
                  </span>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Genres: </b>
                  <span v-if="movie.genres" v-for="m of movie.genres.genres"
                    >{{ m.text }},
                  </span>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Directors: </b>
                  <span v-if="movie.directors" v-for="d of movie.directors">
                    <span v-for="d of d.credits">
                      {{ d.name.nameText.text }}
                    </span>
                  </span>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Writers: </b>
                  <span v-if="movie.writers" v-for="w of movie.writers">
                    <span v-for="w of w.credits">
                      {{ w.name.nameText.text }}
                    </span>
                  </span>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Plot: </b>
                  <span
                    v-if="
                      movie.plot &&
                      movie.plot.plotText &&
                      movie.plot.plotText.plainText
                    "
                    >{{ movie.plot.plotText.plainText }}</span
                  >
                  <span v-else>None</span>
                </section>
              </section>
            </div>
          </div>
          <div class="row">ratings table here</div>
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
  methods: {
    getMonth(month) {
      switch (month) {
        case 1:
          return "January";
        case 2:
          return "February";
        case 3:
          return "March";
        case 4:
          return "April";
        case 5:
          return "May";
        case 6:
          return "June";
        case 7:
          return "July";
        case 8:
          return "August";
        case 9:
          return "September";
        case 10:
          return "October";
        case 11:
          return "November";
        case 12:
          return "December";
      }
    },
  },
  async beforeMount() {
    try {
      const response = await fetch(
        `/api/api/moviesAPI/title/${this.$route.params.movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.movie = data.results;
        });
      console.log(this.movie);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped></style>
