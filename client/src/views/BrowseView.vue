<script setup>
import NavC from "../components/NavC.vue";
import BrowseMovieSearch from "@/components/BrowseMovieSearch.vue";

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
    <h1>Browse</h1>
    <section>
      <BrowseMovieSearch />
      <button
        type="button"
        class="orange newRating link"
        @click="openModal('sr')"
      >
        New Rating
      </button>
    </section>
  </div>

  <!-- New Rating Specific Modal -->
  <div
    class="modal fade"
    id="specific_modal_rating"
    tabindex="-1"
    aria-labelledby="modal_demo_label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">New Rating</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal('sr')"
          ></button>
        </div>
        <div class="modal-body">rating content here</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModal('sr')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="closeModal('sr')"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
