<script setup>
import NavC from "../components/NavC.vue";
import BrowseMovieSearch from "@/components/BrowseMovieSearch.vue";
import StarRatings from "@/components/StarRatings.vue";

import Dialog from 'primevue/dialog';

import { ref, reactive, onMounted } from "vue";

import { useAuthStore } from '@/stores/auth-store'

const store = useAuthStore()

</script>

<template>
  <NavC />
  <div class="browse">
    <h1 class="text-center p-3 m-0">Explore</h1>
    <section>
      <BrowseMovieSearch class="m-3" @newRating="
          newRating($event); visible = true
          " :user="store.getUser" />
    </section>
  </div>

  <!-- Rating Dialog -->
  <Dialog v-model:visible="visible" modal :header="'New Rating for ' + movieTitle" :style="{ width: '25rem' }">
    <div class="gap-3 mb-3">
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
            <input type="range" class="w-full" min="0.0" max="5.0" step="0.5" id="rating" v-model="movieStars" />
          </div>
          <!-- COMPLEX RATING SECTION -->
          <div v-if="!simple" class="flex flex-column justify-content-between form-group">
            <StarRatings :star="average" />
            <div class="flex justify-content-around">
              <label class="d-flex justify-content-between pr-3" for="acting"> Acting: {{ ratings.acting }}</label>
              <input id="acting" class="form-range" name="acting" type="range" max=5 min=0 step=.1
                v-model="ratings.acting" @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="attraction" class="pr-3">Attraction: {{ ratings.attraction }}</label>
              <input id="attraction" class="form-range" name="attraction" type="range" max=5 min=0 step=.1
                v-model="ratings.attraction" @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="cinemetography" class="pr-3">Cinemetography: {{ ratings.cinemetography }}</label>
              <input id="cinemetography" class="form-range" name="cinemetography" type="range" max="5" min="" step=".1"
                v-model="ratings.cinemetography" @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="dialogue" class="pr-3">Dialogue: {{ ratings.dialogue }}</label><input id="dialogue"
                class="form-range" name="dialogue" type="range" max="5" min="" step=".1" v-model="ratings.dialogue"
                @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="directing" class="pr-3">Directing: {{ ratings.directing }}</label><input id="directing"
                class="form-range" name="directing" type="range" max="5" min="" step=".1" v-model="ratings.directing"
                @input="averageRatings" />
            </div>

            <div class="flex justify-content-around">
              <label for="editing" class="pr-3">Editing: {{ ratings.editing }}</label>
              <input id="editing" class="form-range" name="editing" type="range" max="5" min="" step=".1"
                v-model="ratings.editing" @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="plot" class="pr-3">Plot: {{ ratings.plot }}</label>
              <input id="plot" class="form-range" name="plot" type="range" max="5" min="" step=".1"
                v-model="ratings.plot" @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="soundtrack" class="pr-3">Soundtrack: {{ ratings.soundtrack }}</label>
              <input id="soundtrack" class="form-range" name="soundtrack" type="range" max="5" min="" step=".1"
                v-model="ratings.soundtrack" @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="specialEffects" class="pr-3">Special Effects: {{ ratings.specialEffects }}</label>
              <input id="specialEffects" class="form-range" name="specialEffects" type="range" max="5" min="" step=".1"
                v-model="ratings.specialEffects" @input="averageRatings" />
            </div>
            <div class="flex justify-content-around">
              <label for="theme" class="pr-3">Theme: {{ ratings.theme }}</label>
              <input id="theme" class="form-range" name="theme" type="range" max="5" min="" step=".1"
                v-model="ratings.theme" @input="averageRatings" />
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
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false">Cancel</Button>
      <Button type="button" label="Save" @click="visible = false; postRating();">Save</Button>
    </div>
  </Dialog>


</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  data() {
    return {
      movie: ref(""),
      movieTitle: ref(""),
      movieStars: ref(0),
      simple: ref(true),
      ratings: {
        acting: ref(2.5),
        attraction: ref(2.5),
        cinemetography: ref(2.5),
        dialogue: ref(2.5),
        directing: ref(2.5),
        editing: ref(2.5),
        plot: ref(2.5),
        soundtrack: ref(2.5),
        specialEffects: ref(2.5),
        theme: ref(2.5),
      },
      average: ref(0),
      personalScore: ref(2.5),
      visible: ref(false),
    };
  },
  methods: {
    newRating(movie) {
      this.movie = movie;
      this.movieTitle = movie.titleText.text
      console.log("emit: new rating || movie: ", movie);
    },
    averageRatings() {
      let vals = Object.values(this.ratings)
      let tot = 0
      for (let v of vals) {
        tot += parseFloat(v)
      }
      this.average = tot / vals.length
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
  color: var(--primary-color);
}

.ratingNav {
  cursor: pointer;
  font-size: large;
}
</style>
