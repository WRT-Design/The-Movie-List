<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Card from 'primevue/card';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const controller = new AbortController();
// eslint-disable-next-line no-unused-vars
const signal = controller.signal;

defineEmits(["newRating"]);
</script>

<template>
  <div>
    <!-- Search Bar Section -->
    <InputText id="search" class="h-2rem" type="text" name="movieSearch" placeholder="Search for a movie"
      v-model="searchTerm" @keyup="startSearch(controller)" v-if="!selected" />
    <div v-if="selected" id="selection">
      <p>{{ searchTerm }}</p>
      <p id="deselect" @click="deselect">X</p>
    </div>
    <!-- results -->
    <div class="">
      <Card v-for="movie in searchResults" :key="movie.id" class="card">
        <template #content>
          <div class="flex">
            <img v-if="movie.primaryImage" :src="movie.primaryImage.url" :alt="movie.primaryImage.caption.plainText"
              width="25%" height="25%" />
            <img v-else src="@/assets/no-poster.png" width="25%" height="25%" />
            <div class="px-2">
              <RouterLink class="link" :to="{ name: 'movie', params: { movieId: movie.id } }">
                {{ movie.titleText.text }}
              </RouterLink>

              <h4 v-if="movie.releaseDate">
                <span class="info">Release Date:</span>
                {{ getMonth(movie.releaseDate.month) }}
                {{ movie.releaseDate.day }},
                {{ movie.releaseDate.year }}
              </h4>
              <h4><span class="info">Directors:</span> <span v-if="movie.directors && movie.directors[0]"
                  v-for="d of movie.directors">
                  <span v-for="d of d.credits">
                    {{ d.name.nameText.text }}
                  </span>
                </span>
                <span v-else>None</span>
              </h4>
              <h4>
                <span class="info">Writers:</span> <span v-if="movie.writers && movie.writers[0]"
                  v-for="w of movie.writers">
                  <span v-for="w of w.credits">
                    {{ w.name.nameText.text }}
                  </span>
                </span>
                <span v-else>None</span>
              </h4>
              <p>
                <span class="info">Plot: </span>
                <span v-if="movie.plot && !movie.plot.plotText">
                  {{ movie.plot }}</span>
                <span v-else>No Plot Available</span>
              </p>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchResults: [],
      filteredResults: [],
      searchTerm: "",
      selected: ref(false),
      movieId: "",
      rateHover: ref(false),
      likeHover: ref(false),
    };
  },
  methods: {
    async startSearch(controller) {
      controller.abort(); // cancel any pending fetch request before calling another
      await this.search();
    },
    async search() {
      if (this.searchTerm.length > 2) {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          url: `/api/api/moviesAPI/search/${this.searchTerm}`,
        };

        try {
          const response = await axios.request(options);
          console.log(this.searchResults);
          console.log(response.data.results);
          this.searchResults = response.data.results;

          // also query the db and check if any of the movie results are in the db then show their average scores

          console.log(this.searchResults);
          this.searchResults.map((m) => {
            if (m.plot && m.plot.plotText) {
              m.plot = m.plot.plotText.plainText;
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    // select(e, movieId) {
    //   this.movieId = movieId;
    //   this.searchTerm = this.filteredResults.filter(
    //     (movie) => movie.id == movieId
    //   )[0].title;
    //   this.filteredResults = [];
    //   this.selected = true;
    //   this.$emit("select", this.movieId);
    // },
    // deselect() {
    //   this.searchTerm = "";
    //   this.filteredResults = [];
    //   this.selected = false;
    //   this.$emit("deselect");
    // },
    newRating(e, movieId) {
      for (let movie of this.searchResults) {
        if (movie.id == movieId) {
          this.$emit("newRating", movie);
        }
      }
    },
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
};
</script>

<style>
.movieTitle {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: var(--primary-400);
  cursor: pointer;
  font-size: 1.5rem;
}

.card {
  background-color: var(--highlight-bg);
  margin: 1rem;
}

/* div label,
#search {
  width: 100%;
} */
#search {
  height: 1.5em;
  line-height: 1.5em;
}

.info {
  /* color: var(--primary-400); */
  font-weight: 700;
}

#selection {
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  padding: 1px;
  display: flex;
  justify-content: space-between;
}

#selection p {
  margin: 0;
}

#deselect {
  padding: 0 0.5rem;
  cursor: pointer;
}

.v-enter-active,
.v-leave-active {
  transition: 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
