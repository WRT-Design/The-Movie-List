<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import StarRatings from '../components/StarRatings.vue'

import { ref } from "vue";

defineProps(['movieId', 'movieRatings'])

</script>

<template>
  {{ movieRatings }}
  <DataTable :value="movieRatings" removableSort>
    <Column header="User">
      <template #body="props">
        <RouterLink :to="'/profile/' + usernameMatch(props.data.userId)">
          {{ idMatch(props.data.userId) }}
        </RouterLink>
      </template>
    </Column>
    <Column field="movie_title" header="Title" sortable></Column>
    <Column field="average" header="Rating" sortable>
      <template #body="props">
        <StarRatings :star="props.data.average" />
      </template>
    </Column>
    <!-- TOOLTIP WITH OTHER RATING INFO ^^^ -->
    <Column field="review" header="Review"></Column>
    <Column field="createdDate" header="Date" sortable>
      <template #body="props">
        {{ dateFormat(props.data.createdDate) }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
export default {
  data() {
    return {
      movieRatings: ref([]),
      users: ref([])
    }
  },
  methods: {
    dateFormat(date) {
      date = date.slice(0, 10)
      let split = date.split("-");
      let y = split[0]
      let m = split[1]
      let d = split[2]

      switch (m) {
        case "01":
          m = "January";
          break;
        case "02":
          m = "February";
          break;
        case "03":
          m = "March";
          break;
        case "04":
          m = "April";
          break;
        case "05":
          m = "May";
          break;
        case "06":
          m = "June";
          break;
        case "07":
          m = "July";
          break;
        case "08":
          m = "August";
          break;
        case "09":
          m = "September";
          break;
        case "10":
          m = "October";
          break;
        case "11":
          m = "November";
          break;
        case "12":
          m = "December";
          break;
      }
      date = `${m} ${d}, ${y}`
      return date;
    },
    idMatch(id) {
      for (let user of this.users) {
        if (user.id === id) {
          return user.first_name
        }
      }
    },
    usernameMatch(id) {
      for (let user of this.users) {
        if (user.id === id) {
          return user.username
        }
      }
    }
  },
  async beforeMount() {
    console.log(this.movieRatings)
    // get the movie's ratings 
    await fetch(`/api/api/rating/movie?id=${this.movieId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.movieRatings = data.result;
      });

    // get the user's ratings
    if (this.movieRatings) {
      for (let rating of this.movieRatings) {
        if (!(this.users.find((user) => user.id == rating.userId))) {
          // get the db user 
          await fetch(`/api/api/user/${rating.userId}?id=true`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              this.users.push(data.user)
              console.log(data.user)
            })
        }
      }
    }
  }
}
</script>

<style scoped></style>
