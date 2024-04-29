<script setup>
import LoginC from "../components/LoginC.vue";
import LogoutC from "../components/LogoutC.vue";
import MovieSearch from "../components/MovieSearch.vue";
import StarRatings from '../components/StarRatings.vue'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

import { ref, reactive, onMounted } from "vue";

import { useAuthStore } from '@/stores/auth-store'

const store = useAuthStore()

defineEmits(["post", "rating"]);
defineProps({
  user: {
    type: Object,
    required: true,
  },
})

</script>

<template>

  <div class="h-full flex-shrink-0 absolute left-0 top-0 z-1" style="width:180px;">
    <Menubar v-if="!auth" :model="unAuthItems" class="flex flex-column h-full fixed" style="width:180px;">
      <template #start>
        <RouterLink to="/" class="navbar-brand">
          <img alt="The Movie List logo" src="@/assets/TML_white_1.svg" width="125" height="125" />
        </RouterLink>
      </template>
      <template #end>
        <section class="logInOut py-5">
          <LoginC v-if="!auth" @login="login($event)" />
          <LogoutC v-if="auth" />
        </section>
        &copy; 2024 William Thackeray
      </template>
    </Menubar>
    <Menubar v-if="auth" :model="authItems" class="flex flex-column h-full fixed" style="width:180px;">
      <template #start>
        <RouterLink to="/" class="navbar-brand">
          <img alt="The Movie List logo" src="@/assets/TML_white_1.svg" width="125" height="125" />
        </RouterLink>
      </template>
      <template #end>
        <section class="logInOut py-5">
          <LoginC v-if="!auth" @login="login($event)" />
          <LogoutC v-if="auth" @click="store.clear()" />
        </section>
        &copy; 2024 William Thackeray
      </template>
    </Menubar>
  </div>

  <!-- <footer>

  </footer> -->

  <!-- Rating Dialog -->
  <Dialog v-model:visible="rVisible" modal header="New Rating" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Rate Your Movie</span>
    <div class="gap-3 mb-3">
      <MovieSearch @select="select($event)" @deselect="deselect" />
      <div class="flex flex-column">
        <section class="flex justify-content-between">
          <p class="active ratingNav p-2" @click="toggle">Simple Rating</p>
          <p class="ratingNav p-2" @click="toggle">Complex Rating</p>
        </section>
        <section>
          <!-- SIMPLE RATING SECTION -->
          <div v-if="simple" class="form-group">
            <div class="flex flex-row justify-content-between">
              <div for="rating">Rating: {{ movieStars }} Stars </div>
              <StarRatings :star="movieStars" />
            </div>
            <input type="range" class="w-full" min="1.0" max="5.0" step="0.5" id="rating" v-model="movieStars" />
          </div>
          <!-- COMPLEX RATING SECTION -->
          <div v-if="!simple" class="flex flex-column justify-content-between form-group">
            <StarRatings :star="average" />
            <div class="flex justify-content-around">
              <label class="d-flex justify-content-between pr-3" for="acting"> Acting: {{ ratings.acting }}</label>
              <input id="acting" class="form-range" name="acting" type="range" max=5 min=1 step=.1
                v-model="ratings.acting" />
            </div>
            <div class="flex justify-content-around">
              <label for="attraction" class="pr-3">Attraction: {{ ratings.attraction }}</label>
              <input id="attraction" class="form-range" name="attraction" type="range" max=5 min=1 step=.1
                v-model="ratings.attraction" />
            </div>
            <div class="flex justify-content-around">
              <label for="cinemetography" class="pr-3">Cinemetography: {{ ratings.cinemetography }}</label>
              <input id="cinemetography" class="form-range" name="cinemetography" type="range" max="5" min="" step=".1"
                v-model="ratings.cinemetography" />
            </div>
            <div class="flex justify-content-around">
              <label for="dialogue" class="pr-3">Dialogue: {{ ratings.dialogue }}</label><input id="dialogue"
                class="form-range" name="dialogue" type="range" max="5" min="" step=".1" v-model="ratings.dialogue" />
            </div>
            <div class="flex justify-content-around">
              <label for="directing" class="pr-3">Directing: {{ ratings.directing }}</label><input id="directing"
                class="form-range" name="directing" type="range" max="5" min="" step=".1" v-model="ratings.directing" />
            </div>

            <div class="flex justify-content-around">
              <label for="editing" class="pr-3">Editing: {{ ratings.editing }}</label>
              <input id="editing" class="form-range" name="editing" type="range" max="5" min="" step=".1"
                v-model="ratings.editing" />
            </div>
            <div class="flex justify-content-around">
              <label for="plot" class="pr-3">Plot: {{ ratings.plot }}</label>
              <input id="plot" class="form-range" name="plot" type="range" max="5" min="" step=".1"
                v-model="ratings.plot" />
            </div>
            <div class="flex justify-content-around">
              <label for="soundtrack" class="pr-3">Soundtrack: {{ ratings.soundtrack }}</label>
              <input id="soundtrack" class="form-range" name="soundtrack" type="range" max="5" min="" step=".1"
                v-model="ratings.soundtrack" />
            </div>
            <div class="flex justify-content-around">
              <label for="specialEffects" class="pr-3">Special Effects: {{ ratings.specialEffects }}</label>
              <input id="specialEffects" class="form-range" name="specialEffects" type="range" max="5" min="" step=".1"
                v-model="ratings.specialEffects" />
            </div>
            <div class="flex justify-content-around">
              <label for="theme" class="pr-3">Theme: {{ ratings.theme }}</label>
              <input id="theme" class="form-range" name="theme" type="range" max="5" min="" step=".1"
                v-model="ratings.theme" />
            </div>
            <div id="psLabel" class="flex justify-content-around">
              <label for="personalScore" class="pr-3">Personal Score: {{ personalScore }}</label>
              <input id="personalScore" class="form-range" name="personalScore" type="range" max="5" min="" step=".1"
                v-model="personalScore" />
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="flex flex-column gap-3 mb-5">
      <h3>Your Review</h3>
      <textarea class="review" v-model="review" placeholder="Write your review..."></textarea>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="rVisible = false">Cancel</Button>
      <Button type="button" label="Save" @click="rVisible = false; postRating();">Save</Button>
    </div>
  </Dialog>

  <!-- Post Dialog -->
  <Dialog v-model:visible="pVisible" modal header="New Post" :style="{ width: '25rem' }">
    <div class="flex align-items-center gap-3 mb-3">
      <textarea v-model="postContent" class="postContent" placeholder="What's on your mind..."></textarea>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="pVisible = false"></Button>
      <Button type="button" label="Save" @click="pVisible = false; postPost()"></Button>
    </div>
  </Dialog>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      auth: ref(this.$auth0.isAuthenticated),
      unAuthItems: ref([
        {
          label: "Home",
          icon: 'pi pi-home',
          command: () => {
            this.$router.push('/')
          }
        },
        {
          label: "Explore",
          icon: 'pi pi-search',
          command: () => {
            this.$router.push('/browse')
          }
        },
      ]),
      authItems: ref([
        {
          label: "Home",
          icon: 'pi pi-home',
          command: () => {
            this.$router.push('/')
          }
        },
        {
          label: "Profile",
          icon: 'pi pi-user',
          command: () => {
            this.$router.push(`/profile/${this.$props.user.nickname}`)
          }
        },
        {
          label: "Explore",
          icon: 'pi pi-search',
          command: () => {
            this.$router.push('/browse')
          }
        },
        {
          label: "Settings",
          icon: 'pi pi-cog',
          command: () => {
            this.$router.push('/settings')
          }
        },
        {
          label: "New Rating",
          icon: "pi pi-ticket",
          command: () => {
            console.log('new rating')
            this.rVisible = true
          }
        },
        {
          label: "New Post",
          icon: "pi pi-pencil",
          command: () => {
            console.log('new post')
            this.pVisible = true
          }
        },
      ]),
      rVisible: ref(false),
      pVisible: ref(false),
      username: ref('thack.whack'),
      postContent: ref(""),
      simple: ref(true),
      movie: ref(),
      movieStars: ref(0),
      ratings: {
        acting: ref(0),
        attraction: ref(0),
        cinemetography: ref(0),
        dialogue: ref(0),
        directing: ref(0),
        editing: ref(0),
        plot: ref(0),
        soundtrack: ref(0),
        specialEffects: ref(0),
        theme: ref(0),
      },
      personalScore: ref(0),
      review: "",
      movieId: "",
      selectedMovie: {}
    };
  },
  methods: {
    async postRating() {
      const username = this.$auth0.user._rawValue.nickname;
      let average;
      let total = 0;
      let ratingArr = [];

      let movieTitle = document.querySelector("#selection p").innerText;

      console.log("Movie Title: ", movieTitle);

      let user;
      await fetch(`/api/api/user/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          user = result.user;
        });

      if (!this.simple) {
        for (let rating in this.ratings) {
          if (this.ratings[rating] != 0) ratingArr.push(this.ratings[rating]);
        }
        for (let rating of ratingArr) {
          total += rating;
        }

        if (ratingArr.length == 0) average = 0;
        else average = total / ratingArr.length;
        console.log("average: ", average);


        const body = {
          user: user.id,
          movie: movieTitle,
          movieId: this.selectedMovie.id,
          ratings: {
            acting: this.ratings.acting,
            attraction: this.ratings.attraction,
            cinemetography: this.ratings.cinemetography,
            dialogue: this.ratings.dialogue,
            directing: this.ratings.directing,
            editing: this.ratings.editing,
            plot: this.ratings.plot,
            soundtrack: this.ratings.soundtrack,
            specialEffects: this.ratings.specialEffects,
            theme: this.ratings.theme,
          },
          personalScore: this.personalScore,
          review: this.review,
          movieInfo: this.selectedMovie
        };

        await fetch(`/api/api/rating?type=complex`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        this.$emit("rating");
      }
      if (this.simple) {
        const body = {
          user: user.id,
          movie: movieTitle,
          movieId: this.selectedMovie.id,
          rating: this.movieStars,
          personalScore: this.movieStars,
          review: this.review,
          movieInfo: this.selectedMovie
        };

        await fetch(`/api/api/rating?type=simple`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        this.$emit("rating");
      }

      // reset values
      this.cancelRating()
    },
    cancelRating() {
      this.acting = 0.0;
      this.attraction = 0.0;
      this.cinemetography = 0.0;
      this.dialogue = 0.0;
      this.directing = 0.0;
      this.editing = 0.0;
      this.plot = 0.0;
      this.soundtrack = 0.0;
      this.specialEffects = 0.0;
      this.theme = 0.0;
      this.personalScore = 0.0;
      this.review = "";
    },
    async postPost() {
      console.log("post!");
      console.log("content: ", this.postContent);

      const username = this.$auth0.user._rawValue.nickname;

      let user;
      await fetch(`/api/api/user/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          user = result.user;
        });

      console.log("user: ", user);

      const body = {
        user: user.id,
        post: this.postContent,
      };

      // fetch:POST the post
      await fetch(`/api/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      this.postContent = ""
      this.$emit("post");
    },
    cancelPost() {
      console.log("cancel post");
      this.postContent = "";
    },
    select(m) {
      console.log("select");
      this.selectedMovie = m;
      console.log('this.selectedMovie', this.selectedMovie);
      // console.log(document.querySelector("#post-btn"));
      // document.querySelector("#post-btn").disabled = false;
    },
    deselect() {
      console.log("deselect");
      document.querySelector("#post-btn").disabled = true;
    },
    login(e) {
      console.log('login')
      console.log(e)
    },
    toggle(event) {
      if (!event.target.classList || !event.target.classList.contains("active")) {
        event.target.classList.add('active')
        if (event.target.nextSibling)
          event.target.nextSibling.classList.remove('active');
        else
          event.target.previousSibling.classList.remove('active')
        this.simple = !this.simple;
      }

    }
  },
  async beforeMount() {
    console.log('before mount')
    console.log(await this.$props.user)
  },

};
</script>

<style scoped>
.p-menuitem-link span,
.p-button span,
.p-column-header-content span {
  margin: 3px;
}

.navWrapper {
  min-height: 100vh;
  position: fixed;
  width: 25%;
  min-width: 200px;
}

/* .navWrapper,
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
} */

/* nav>* {
  padding: 0.5rem 1rem;
} */

/* nav>*:hover {
  background-color: #f5901542;
} */

.link {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.router-link-active {
  font-family: "Caveat";
  font-size: 2rem;
  color: var(--tml-orange);
}

.newRating {
  margin: 0;
  margin-top: 2rem;
}

.newPost {
  margin: 0;
}

p {
  cursor: pointer;
}

.posts {
  margin-top: 2rem;
}

.ratings {
  column-count: 2;
}

.ratings div {
  display: flex;
  flex-direction: column;
}

.ratings div div {
  display: block;
}

.ratings label {
  width: 75%;
}

#psLabel {
  padding: 1rem 0;
}

.ratings input {
  /* margin: 0 1rem; */
  width: 25%;
}

/* .modal-footer {
  color: var(--tml-black)
} */

.postContent,
.review {
  width: 100%;
  height: 200px;
}

footer {
  position: fixed;
  width: 25%;
  min-width: inherit;
  left: 0;
  bottom: 0;
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
  color: white;
}
</style>
@/stores/auth-store