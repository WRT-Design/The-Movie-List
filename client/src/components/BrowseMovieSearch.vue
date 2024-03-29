<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const controller = new AbortController();
// eslint-disable-next-line no-unused-vars
const signal = controller.signal;

defineEmits(["newRating"]);
</script>

<template>
  <div>
    <!-- Search Bar Section -->
    <label for="movieSearch"
      >Movie:
      <input
        id="search"
        type="text"
        name="movieSearch"
        placeholder="Search for a movie"
        v-model="searchTerm"
        @keyup="startSearch(controller)"
        v-if="!selected"
      />
      <div v-if="selected" id="selection">
        <p>{{ searchTerm }}</p>
        <p id="deselect" @click="deselect">X</p>
      </div>
    </label>
    <!-- results -->
    <div class="results">
      <ul>
        <li v-for="movie in searchResults" :key="movie.id" class="d-flex pt-2">
          <img
            v-if="movie.primaryImage"
            :src="movie.primaryImage.url"
            :alt="movie.primaryImage.caption.plainText"
            width="25%"
            height="25%"
            class="p-2"
          />
          <img
            v-else
            src="@/assets/no-poster.png"
            width="25%"
            height="25%"
            class="p-2"
          />
          <div class="p-2">
            <h3 class="movieTitle">
              <RouterLink
                class="orange"
                :to="{ name: 'movie', params: { movieId: movie.id } }"
                >{{ movie.titleText.text }}</RouterLink
              >
            </h3>

            <h4 v-if="movie.releaseDate">
              {{ getMonth(movie.releaseDate.month) }}
              {{ movie.releaseDate.day }},
              {{ movie.releaseDate.year }}
            </h4>
            <h4>Directors: Writers:</h4>
            <p>
              Plot:
              <span v-if="movie.plot && !movie.plot.plotText">
                {{ movie.plot }}</span
              >
              <span v-else>No Plot Available</span>
            </p>
            <section>
              <button
                type="button"
                class="btn primary bg-secondary text-bg-dark m-2"
                @mouseenter="rateHover = true"
                @mouseleave="rateHover = false"
                @click="newRating($event, movie.id)"
              >
                <FontAwesomeIcon icon="fa-regular fa-star" color="white" />
                <Transition>
                  <span v-if="rateHover" class="p-1">Rate</span>
                </Transition>
              </button>
              <!-- <button
                type="button"
                class="btn primary bg-secondary text-bg-dark m-2"
                @mouseenter="likeHover = true"
                @mouseleave="likeHover = false"
              >
                <FontAwesomeIcon icon="fa-regular fa-heart" color="white" />
                <Transition>
                  <span v-if="likeHover">Like</span>
                </Transition>
              </button> -->
            </section>
          </div>
        </li>
      </ul>
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
          url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${this.searchTerm}`,
          params: {
            exact: "false",
            info: "base_info",
            titleType: "movie",
            limit: "20",
          },
          headers: {
            "X-RapidAPI-Key":
              "6bee0ab6damshafb3993a5daf034p1d5334jsn3f5f2b13db0d",
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);
          console.log(this.searchResults);
          console.log(response.data.results);
          this.searchResults = response.data.results;

          console.log(this.searchResults);
          this.searchResults.map((m) => {
            if (m.plot && m.plot.plotText) {
              m.plot = m.plot.plotText.plainText;
              console.log(m);
              console.log(m.plot);
            }
          });

          console.log(this.searchResults);
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
          console.log(movie.titleText.text);
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

div label,
#search {
  width: 100%;
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
