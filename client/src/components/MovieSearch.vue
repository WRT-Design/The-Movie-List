<script setup>
import { ref } from "vue";

const controller = new AbortController();
// eslint-disable-next-line no-unused-vars
const signal = controller.signal;

defineEmits(["select", "deselect"]);
</script>

<template>
  <div>
    <!-- Search Bar Section -->
    <label for="movieSearch">Movie:
      <input id="search" type="text" name="movieSearch" placeholder="Search for a movie" v-model="searchTerm"
        @keyup="startSearch(controller)" v-if="!selected" />
      <div v-if="selected" id="selection">
        <p>{{ searchTerm }}</p>
        <p id="deselect" @click="deselect">X</p>
      </div>
    </label>
    <!-- results -->
    <div class="results">
      <ul class="list-group">
        <li v-for="movie in filteredResults" :key="movie.id" @click="select($event, movie.id)"
          class="list-group-item d-flex flex-row align-items-center li">
          <img v-if="movie.image" :src="movie.image.url" width="40px" height="auto" class="m-2" />
          <img v-else src="@/assets/no-poster.png" width="40px" height="auto" class="m-2" />
          <h3 class="px-2">{{ movie.title }}</h3>
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
      selectedMovie: {}
    };
  },
  methods: {
    async startSearch(controller) {
      controller.abort(); // cancel any pending fetch request before calling another
      await this.search();
    },
    async search() {
      if (this.searchTerm.length > 1) {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          url: `/api/api/moviesAPI/search/${this.searchTerm}`,
        };

        try {
          const response = await axios.request(options);
          this.searchResults = response.data.results;
          console.log(this.searchResults)

          for (let res of this.searchResults) {
            if (res.releaseYear == undefined) {
              this.searchResults.splice(this.searchResults.indexOf(res), 1);
            }
          }

          this.filteredResults = this.searchResults.map((movie) => ({
            id: movie.id,
            title: movie.titleText.text,
            image: movie.primaryImage,
            trailer: movie.trailer,
            genres: movie.genres,
            year: movie.releaseYear && movie.releaseYear.year ? movie.releaseYear.year : null,
            plot: movie.plot && movie.plot.plotText && movie.plot.plotText.plainText ? movie.plot.plotText.plainText : null,
            runtime: movie.runtime && movie.runtime.seconds ? movie.runtime.seconds : null
          }));
        } catch (error) {
          console.error(error);
        }
      }
    },
    select(e, movieId) {
      this.movieId = movieId;
      this.searchTerm = this.filteredResults.filter(
        (movie) => movie.id == movieId
      )[0].title;
      for (let movie of this.filteredResults) {
        if (movie.id == movieId) {
          this.selectedMovie = movie
        }
      }
      this.filteredResults = [];
      this.selected = true;
      this.$emit("select", this.selectedMovie);
    },
    deselect() {
      this.searchTerm = "";
      this.filteredResults = [];
      this.selected = false;
      this.$emit("deselect");
    },
  },
};
</script>

<style>
.li {
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
</style>
