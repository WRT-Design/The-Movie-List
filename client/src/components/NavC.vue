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

import { useAuthStore } from '@/stores/AuthStore'

const store = useAuthStore()

console.log(store.user)

defineEmits(["post", "rating"]);
defineProps({
  user: {
    type: Object,
    required: true,
  },
})


// const { loginWithRedirect, user, isAuthenticated } = useAuth0();

// const state = reactive({
//   modal_rating: null,
//   modal_post: null,
// });

// onMounted(() => {
//   state.modal_rating = new Modal("#modal_rating", {});
//   state.modal_post = new Modal("#modal_post", {});
// });

// function openModal(type) {
//   if (type == "r") state.modal_rating.show();
//   else if (type == "p") state.modal_post.show();
// }

// function closeModal(type) {
//   if (type == "r") state.modal_rating.hide();
//   else if (type == "p") state.modal_post.hide();
// }
</script>

<template>

  <div class="">

    <div class="h-full flex-shrink-0 absolute left-0 top-0 w-2 z-1" style="width:180px;">
      <Menubar v-if="!auth" :model="unAuthItems" class="flex flex-column h-full" style="width:180px;">
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
      <Menubar v-if="auth" :model="authItems" class="flex flex-column h-full">
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
    </div>
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
          <div v-if="!simple" class="form-group">
            <div>
              <StarRatings :star="average" />
              <label class="d-flex justify-content-between" for="acting">
                <span>Acting: {{ ratings.acting }}</span>

              </label>
              <input id="acting" class="form-range" name="acting" type="range" max=5 min=1 step=.1
                v-model="ratings.acting" />
            </div>
            <div>
              <label for="attraction">Attraction: {{ ratings.attraction }}</label>
              <input id="attraction" class="form-range" name="attraction" type="range" max=5 min=1 step=.1
                v-model="ratings.attraction" />
            </div>
            <div>
              <label for="cinemetography">Cinemetography: {{ ratings.cinemetography }}</label>
              <input id="cinemetography" class="form-range" name="cinemetography" type="range" max="5" min="" step=".1"
                v-model="ratings.cinemetography" />
            </div>
            <div>
              <label for="dialogue">Dialogue: {{ ratings.dialogue }}</label><input id="dialogue" class="form-range"
                name="dialogue" type="range" max="5" min="" step=".1" v-model="ratings.dialogue" />
            </div>
            <div>
              <label for="directing">Directing: {{ ratings.directing }}</label><input id="directing" class="form-range"
                name="directing" type="range" max="5" min="" step=".1" v-model="ratings.directing" />
            </div>

            <div>
              <label for="editing">Editing: {{ ratings.editing }}</label>
              <input id="editing" class="form-range" name="editing" type="range" max="5" min="" step=".1"
                v-model="ratings.editing" />
            </div>
            <div>
              <label for="plot">Plot: {{ ratings.plot }}</label>
              <input id="plot" class="form-range" name="plot" type="range" max="5" min="" step=".1"
                v-model="ratings.plot" />
            </div>
            <div>
              <label for="soundtrack">Soundtrack: {{ ratings.soundtrack }}</label>
              <input id="soundtrack" class="form-range" name="soundtrack" type="range" max="5" min="" step=".1"
                v-model="ratings.soundtrack" />
            </div>
            <div>
              <label for="specialEffects">Special Effects: {{ ratings.specialEffects }}</label>
              <input id="specialEffects" class="form-range" name="specialEffects" type="range" max="5" min="" step=".1"
                v-model="ratings.specialEffects" />
            </div>
            <div>
              <label for="theme">Theme: {{ ratings.theme }}</label>
              <input id="theme" class="form-range" name="theme" type="range" max="5" min="" step=".1"
                v-model="ratings.theme" />
            </div>
            <div id="psLabel">
              <label for="personalScore">Personal Score: {{ personalScore }}</label>
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
            this.$router.push(`/profile/thack.whack`)
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
          movieId: this.movieId,
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
          movieId: this.movieId,
          rating: this.movieStars,
          personalScore: this.movieStars,
          review: this.review,
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
    },
    cancelRating() {
      console.log("cancel rating");
      // set rating content inputs to ''
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
    select(id) {
      console.log("select");
      this.movieId = id;
      console.log(document.querySelector("#post-btn"));
      document.querySelector("#post-btn").disabled = false;
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
