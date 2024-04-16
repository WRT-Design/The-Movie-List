<script setup>
import LoginC from "../components/LoginC.vue";
import LogoutC from "../components/LogoutC.vue";
import MovieSearch from "../components/MovieSearch.vue";
import StarRatings from '../components/StarRatings.vue'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";



import { Modal } from "bootstrap";
import { ref, reactive, onMounted } from "vue";

defineEmits(["post", "rating"]);
defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const state = reactive({
  modal_rating: null,
  modal_post: null,
});

onMounted(() => {
  state.modal_rating = new Modal("#modal_rating", {});
  state.modal_post = new Modal("#modal_post", {});
});

function openModal(type) {
  if (type == "r") state.modal_rating.show();
  else if (type == "p") state.modal_post.show();
}

function closeModal(type) {
  if (type == "r") state.modal_rating.hide();
  else if (type == "p") state.modal_post.hide();
}
</script>

<template>
  <div class="navWrapper text-light d-flex flex-column align-items-center" data-bs-theme="dark">
    <RouterLink to="/" class="navbar-brand">
      <img alt="The Movie List logo" class="logo text-center" src="@/assets/TML_white_1.svg" width="125" height="125" />
    </RouterLink>
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid d-flex justify-content-center">
        <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav d-flex flex-column">
            <RouterLink class="nav-link text-center" to="/">Home</RouterLink>
            <RouterLink v-if="auth" class="nav-link text-center" :to="{
              name: 'profile',
              params: {
                username: 'thack.whack'
              }
            }">Profile</RouterLink>
            <RouterLink class="nav-link text-center" to="/browse">Explore</RouterLink>
            <RouterLink v-if="auth" class="nav-link text-center" to="/settings">Settings</RouterLink>
            <button v-if="auth" type="button" class="nav-link newRating link" @click="openModal('r')">
              New Rating
            </button>

            <button v-if="auth" type="button" class="nav-link newPost link" @click="openModal('p')">
              New Post
            </button>
          </div>
        </div>
      </div>
    </nav>

    <footer>
      <section class="logInOut">
        <LoginC v-if="!auth" @login="login($event)" />
        <LogoutC v-if="auth" />
      </section>
      &copy; 2024 William Thackeray
    </footer>
  </div>

  <!-- Rating Modal -->
  <div class="modal fade text-light" id="modal_rating" tabindex="-1" aria-labelledby="modal_demo_label"
    data-bs-theme="dark" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">New Rating</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="
              closeModal('r');
            cancelRating();
            "></button>
        </div>
        <div class="modal-body">
          <h3>Movie</h3>
          <MovieSearch @select="select($event)" @deselect="deselect" />
          <h3>Ratings</h3>
          <div class="">
            <section class="d-flex justify-content-around">
              <p class="active ratingNav" @click="toggle">Simple Rating</p>
              <p class="ratingNav" @click="toggle">Complex Rating</p>
            </section>
            <section>
              <div v-if="simple" class="form-group">
                <div class="d-flex justify-content-between">
                  <span for="rating">Rating: {{ movieStars }} Stars</span>
                  <StarRatings :star="movieStars" />

                </div>
                <input type="range" class="form-range" min="1.0" max="5.0" step="0.5" id="rating"
                  v-model="movieStars"></input>
              </div>
              <div v-if="!simple" class="form-group">
                <div>
                  <label class="d-flex justify-content-between" for="acting">
                    <span>Acting: {{ ratings.acting }}</span>
                    <StarRatings :star="average" />

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
                  <input id="cinemetography" class="form-range" name="cinemetography" type="range" max="5" min=""
                    step=".1" v-model="ratings.cinemetography" />
                </div>
                <div>
                  <label for="dialogue">Dialogue: {{ ratings.dialogue }}</label><input id="dialogue" class="form-range"
                    name="dialogue" type="range" max="5" min="" step=".1" v-model="ratings.dialogue" />
                </div>
                <div>
                  <label for="directing">Directing: {{ ratings.directing }}</label><input id="directing"
                    class="form-range" name="directing" type="range" max="5" min="" step=".1"
                    v-model="ratings.directing" />
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
                  <input id="specialEffects" class="form-range" name="specialEffects" type="range" max="5" min=""
                    step=".1" v-model="ratings.specialEffects" />
                </div>
                <div>
                  <label for="theme">Theme: {{ ratings.theme }}</label>
                  <input id="theme" class="form-range" name="theme" type="range" max="5" min="" step=".1"
                    v-model="ratings.theme" />
                </div>
                <div id="psLabel">
                  <label for="personalScore">Personal Score: {{ personalScore }}</label>
                  <input id="personalScore" class="form-range" name="personalScore" type="range" max="5" min=""
                    step=".1" v-model="personalScore" />
                </div>
              </div>
            </section>
          </div>

          <div id="psLabel"></div>

          <h3>Your Review</h3>
          <textarea class="review" v-model="review" placeholder="Write your review..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="
              closeModal('r');
            cancelRating();
            ">
            Cancel
          </button>
          <button type=" button" class="btn btn-primary" id="post-btn" @click="
              closeModal('r');
            postRating();
            " disabled>
            Post
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Post Modal -->
  <div class="modal fade text-light" id="modal_post" tabindex="-1" aria-labelledby="modal_demo_label"
    data-bs-theme="dark" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">New Post</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal('p')"></button>
        </div>
        <div class="modal-body">
          <textarea v-model="postContent" class="postContent" placeholder="What's on your mind..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="
              closeModal('p');
            cancelPost();
            ">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="
              closeModal('p');
            postPost();
            ">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      auth: ref(this.$auth0.isAuthenticated),
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
  border: solid 3px var(--tml-orange);
  min-height: 100vh;
  position: fixed;
  padding: 3rem;
  width: 25%;
  font-size: 1.5rem;
  min-width: 200px;
  background-color: var(--tml-black);
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
