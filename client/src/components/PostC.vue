<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps(["content", "postId", "picURL", "name", "username", "date"]);
</script>

<template>
  <li :id="postId" class="card" data-bs-theme="dark">
    <section class="card-header d-flex align-items-center">
      <img v-if="picURL" :src="picURL" alt="avatar" width="40px" height="40px" />
      <img v-else src="@/assets/annon_avatar.jpg" alt="avatar" width="40px" height="40px" />
      <span id="name">{{ name }}</span>
      <span id="username">@{{ username }}</span>
      <span id="date"><small>{{ date }}</small></span>
    </section>
    <section class="card-body">
      {{ content }}
    </section>
    <section class="card-footer">
      <button type="button" id="delBtnPost" @click="deletePost($event, postId)">
        <FontAwesomeIcon icon="fa-regular fa-trash-can" />
      </button>

      <button type="button" id="starBtn">
        <!-- <FontAwesomeIcon icon="fa-solid fa-heart" id="starIcon" /> -->
        <FontAwesomeIcon icon="fa-regular fa-heart" />
      </button>
      <button type="button" id="commentBtn">
        <FontAwesomeIcon icon="fa-regular fa-message" />
      </button>
    </section>
  </li>
</template>

<script>
export default {
  methods: {
    deletePost(e, postId) {
      // TODO: add a confirm delete before we actually delete the post.

      // remove from UI
      document.getElementById(postId).remove();


      // do a fetch to remove from the DB
      fetch(`/api/api/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>

<style>
button {
  border: none;
  outline: none;
  background: none;
  color: white;
}

#name,
#username {
  font-size: 1.2rem;
}

#name {
  margin-left: 1rem;
}

#username,
#date {
  color: rgb(194, 194, 194);
  margin-left: 1rem;
}

.postBody {
  padding: 0.5rem 0;
}

#starIcon {
  color: var(--tml-orange);
}
</style>
