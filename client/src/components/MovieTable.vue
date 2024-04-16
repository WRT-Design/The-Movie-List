<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  tableType: String
})

</script>

<template>
  <table class="table table-striped" data-bs-theme="dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Average</th>
      </tr>
    </thead>
    <tbody>
      <tr ref="listData" v-for="item of listData">
        <th scope="row">{{ listData.indexOf(item) + 1 }}</th>
        <td>
          <RouterLink class="orange" :to="{ name: 'movie', params: { movieId: item.api_id } }">
            {{ item.title }}
          </RouterLink>
        </td>
        <td>{{ item.avg_overall }}</td>
      </tr>
    </tbody>
  </table>
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
