<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps(['star'])
</script>

<template>
  <div class="min-w-max">
    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="star >= 1" />
    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="star >= 0.5" />
    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="star >= 2" />
    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="star >= 1.5" />
    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="star >= 3" />
    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="star >= 2.5" />
    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="star >= 4" />
    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="star >= 3.5" />
    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />

    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star" v-if="star >= 5" />
    <FontAwesomeIcon class="starIcon" icon="fa-bold fa-star-half-stroke" v-else-if="star >= 4.5" />
    <FontAwesomeIcon class="starIcon" icon="fa-regular fa-star" v-else />
  </div>
</template>