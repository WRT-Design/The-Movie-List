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
        <th scope="col">Movie</th>
        <th scope="col">Average</th>
        <th scope="col">Review</th>
      </tr>
    </thead>
    <tbody>
      <tr ref="listData" v-for="item of listData">
        <th scope="row">{{ item.movie_title }}</th>
        <td>{{ item.average }}</td>
        <td>{{ item.review }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      listData: ref()
    }
  },
  async beforeMount() {
    console.log('beforeMount')
    console.log('props: ', this.$props.tableType)
    let prop = this.$props.tableType
    await fetch(`/api/api/${prop}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(data => {
        this.listData = Object.values(data).map((obj) => { return obj })[0]
      })
    console.log(this.listData)
  },

}
</script>

<style scoped></style>
