<script setup>
import NavC from "../components/NavC.vue";
import BrowseMovieSearch from "@/components/BrowseMovieSearch.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { Modal } from "bootstrap";
import { ref, reactive, onMounted } from "vue";

const state = reactive({
  specific_modal_rating: null,
});

onMounted(() => {
  state.specific_modal_rating = new Modal("#specific_modal_rating", {});
});

function openModal(type) {
  if (type == "sr") state.specific_modal_rating.show();
}

function closeModal(type) {
  if (type == "sr") state.specific_modal_rating.hide();
}
</script>

<template>
  <NavC />
  <div class="browse">
    <h1 class="text-center p-3 m-0">Explore</h1>
    <section>
      <BrowseMovieSearch class="m-3" @newRating="
        newRating($event);
      openModal('sr');
      " />
    </section>
  </div>

  <!-- New Rating Specific Modal -->
  <div class="modal fade text-light" id="specific_modal_rating" tabindex="-1" aria-labelledby="modal_demo_label"
    aria-hidden="true" data-bs-theme="dark">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">
            <span v-if="movie">Rating for {{ movie.titleText.text }}</span>
          </h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal('sr')"></button>
        </div>
        <div v-if="movie" class="modal-body">
          <section class="d-flex justify-content-around">
            <p class="active ratingNav" @click="toggle">Simple Rating</p>
            <p class="ratingNav" @click="toggle">Complex Rating</p>
          </section>
          <section>
            <div v-if="simple" class="form-group">
              <div class="d-flex justify-content-between">
                <span for="rating">Rating: {{ movieStars }} Stars</span>
                <span>
                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" /> <!-- Base case is 1 star-->
                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="movieStars >= 2" />
                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="movieStars >= 1.5" />
                  <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="movieStars >= 3" />
                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="movieStars >= 2.5" />
                  <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="movieStars >= 4" />
                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="movieStars >= 3.5" />
                  <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="movieStars >= 5" />
                  <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="movieStars >= 4.5" />
                  <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />
                </span>
              </div>
              <input type="range" class="form-range" min="1.0" max="5.0" step="0.5" id="rating"
                v-model="movieStars"></input>
            </div>
            <div v-if="!simple" class="form-group">
              <div>
                <label class="d-flex justify-content-between" for="acting">
                  <span>Acting: {{ ratings.acting }}</span>
                  <span>
                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" /> <!-- Base case is 1 star-->

                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="average >= 2" />
                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="average >= 1.5" />
                    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="average >= 3" />
                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="average >= 2.5" />
                    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="average >= 4" />
                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="average >= 3.5" />
                    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="average >= 5" />
                    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="average >= 4.5" />
                    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

                  </span>
                </label>
                <input id="acting" class="form-range" name="acting" type="range" max="5" min="1" step=".1"
                  v-model="ratings.acting" />
              </div>
              <div>
                <label for="attraction">Attraction: {{ ratings.attraction }}</label>
                <input id="attraction" class="form-range" name="attraction" type="range" max="5" min="" step=".1"
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
                <input id="personalScore" class="form-range" name="personalScore" type="range" max="5" min="" step=".1"
                  v-model="personalScore" />
              </div>
            </div>
            <div class="form-group">
              <label for="comment">
                <h3>Your Review</h3>
              </label>
              <textarea class="form-control" id="comment" v-model="movie.comment"
                placeholder="Write your review..."></textarea>
            </div>
          </section>
          <!-- fill out the rest of the modal information needed -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal('sr')">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="closeModal('sr'); postRating()">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { ref, reactive, onMounted } from "vue";

export default {
  data() {
    return {
      movie: ref(""),
      movieStars: ref(0),
      simple: ref(true),
      ratings: {
        acting: ref(3.5),
        attraction: ref(3.5),
        cinemetography: ref(3.5),
        dialogue: ref(3.5),
        directing: ref(3.5),
        editing: ref(3.5),
        plot: ref(3.5),
        soundtrack: ref(3.5),
        specialEffects: ref(3.5),
        theme: ref(3.5),
      },
      average: ref(),
      personalScore: ref(3.5),
    };
  },
  methods: {
    newRating(movie) {
      this.movie = movie;
      console.log("emit: new rating || movie: ", movie);
      // this.openModal("sr");
    },
    async postRating() {
      console.log('post rating')
      console.log('review: ', this.movie.comment, ' || Stars: ', this.movieStars)

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

      // get the new rating body 
      //  should include rating and review
      //  the fetch should include a param of the type of rating (simple || complex)
      //  ^^ can test this by checking if 'this.simple' is true or false.
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
    // onMounted() {
    //   this.state.specific_modal_rating = new Modal(
    //     "#specific_modal_rating",
    //     {}
    //   );
    // },
    // openModal(type) {
    //   if (type == "sr") this.state.specific_modal_rating.show();
    // },
    // closeModal(type) {
    //   if (type == "sr") this.state.specific_modal_rating.hide();
    // },
  },
};
</script>

<style>
.active {
  font-weight: 700;
  color: var(--tml-orange);
}

.ratingNav {
  cursor: pointer;
  font-size: large;
}
</style>
