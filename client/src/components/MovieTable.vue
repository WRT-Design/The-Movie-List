<script setup>
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
        <td>{{ item.title }}</td>
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
    await fetch(`/api/api/${this.$props.tableType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(data => this.listData = data.sort((a, b) => { return b.avg_overall - a.avg_overall }))
    console.log(this.listData)
  },

}
</script>

<style scoped></style>
