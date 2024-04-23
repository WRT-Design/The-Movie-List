<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional


import StarRatings from '../components/StarRatings.vue'

import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  tableType: String
})

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
</script>

<template>
  <DataTable :value="listData">
    <Column field="num" header="#" sortable></Column>
    <Column field="title" header="Title" sortable></Column>
    <Column field="avg_overall" header="Rating" sortable></Column>
    <Column field="title" header="Title" sortable></Column>
  </DataTable>
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
        if (this.$props.tableType === 'movie') {
          this.listData = data.sort((a, b) => { return b.avg_overall - a.avg_overall })
        }
        else this.listData = Object.values(data).map((obj) => { return obj })[0]
      })
    console.log(this.listData)
    for (let item of this.listData) {
      item.num = this.listData.indexOf(item) + 1;
    }
  },

}
</script>

<style scoped></style>
