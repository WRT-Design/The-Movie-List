<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Card from 'primevue/card';
import Button from 'primevue/button';

defineProps(["content", "postId", "picURL", "name", "username", "date"]);
</script>

<template>
  <Card :id="postId">
    <template #title>
      <div class="flex align-content-center">
        <img v-if="picURL" :src="picURL" alt="avatar" width="40px" height="40px" />
        <img v-else src="@/assets/annon_avatar.jpg" alt="avatar" width="40px" height="40px" />
        <span class="pl-2">{{ name }}</span>
        <span class="text-color-secondary pl-2">@{{ username }}</span>
        <span class="text-color-secondary pl-2"><small>{{ date }}</small></span>
      </div>
    </template>
    <template #content>
      {{ content }}
    </template>
    <template #footer>
      <Button class="mr-2 text-xs p-2" label="Star" icon="pi pi-star" severity="secondary" />
      <Button class="mr-2 text-xs p-2" label="Comment" icon="pi pi-comment" severity="secondary" />
      <Button class="mr-2 text-xs p-2" label="Delete" icon="pi pi-trash" severity="secondary"
        @click="deletePost($event, postId)" />
    </template>
  </Card>
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
/* button {
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
} */
</style>
