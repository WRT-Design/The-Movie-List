<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  tableType: String
})

// let listData = ref()

// console.log('setup')
// console.log(props.tableType)
// onMounted(async () => {
//   console.log('onMounted')
//   await fetch(`/api/api/${props.tableType}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(result => result.json())
//     .then(data => console.log(data))
//     .then(data => listData = data)
// })

</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped" data-bs-theme="dark">
      <thead class="d-flex">
        <tr class="d-flex">
          <th scope="col">Movie</th>
          <th scope="col">Average</th>
          <th scope="col">Review</th>
        </tr>
      </thead>
      <tbody>
        <tr ref="listData" v-for="item of listData" :key="item.id" :id="item.id">
          <th scope="row">{{ item.movie_title }}</th>
          <td>{{ item.average }}</td>
          <td>{{ item.review }}</td>
          <td class="p-0"><button type="button" id="delBtnPost" @click="deleteRating($event, item.id, item.movieId)">
              <FontAwesomeIcon icon="fa-regular fa-trash-can" />
            </button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // props: {
  //   tableType: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // setup(props) {
  //   console.log('setup')
  //   console.log(props.tableType)
  // },
  methods: {
    deleteRating(e, ratingId, movieId) {
      console.log('deleteRating')
      console.log(ratingId)

      // remove form ui 
      document.getElementById(ratingId).remove()

      // remove from the db
      fetch(`/api/api/rating/${ratingId}?movieId=${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('delete result: ', result)
        })
    }
  },
  data() {
    return {
      listData: ref()
    }
  },
  async beforeMount() {
    console.log('beforeMount')
    console.log('props: ', this.$props.tableType)
    let prop = this.$props.tableType
    // if (prop === 'user') {
    //   prop += `/${this.$auth0.user.id}`
    // }
    await fetch(`/api/api/${prop}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(data => {
        if (this.$props.tableType === 'movie')
          this.listData = data.sort((a, b) => { return b.avg_overall - a.avg_overall })
        else this.listData = Object.values(data).map((obj) => { return obj })[0]
      })
    console.log(this.listData)
  },

}
</script>

<style scoped></style>
