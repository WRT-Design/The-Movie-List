<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, defineProps, onMounted } from "vue";

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import StarRatings from '../components/StarRatings.vue'

const props = defineProps({
  tableType: String
})

</script>

<template>
  <DataTable v-if="listData.length > 0" :value="listData">
    <Column field="num" header="#" sortable>
    </Column>
    <Column field="movie_title" header="Title" sortable></Column>
    <Column field="average" header="Rating" sortable>
      <template #body="props">
        <StarRatings :star="props.data.average" v-tooltip.right="{
    value: stringifyRatings(props.data),
    autoHide: false,
    pt: {
      arrow: {
        style: {
          borderRightColor: 'var(--primary-color)'
        }
      },
      text: 'bg-primary font-medium'
    }
  }" />
      </template>
    </Column>
    <Column field="review" header="Review" class=""></Column>
    <Column header="Actions">
      <template #body="props">
        <i class="pi pi-trash cursor-pointer" @click="deleteRating($event, props.data.id, props.data.movieId)"></i>
        <!-- <i class="pi pi-pencil cursor-pointer"
          @click="editRating($event, props.data.id, props.data.movieId)"></i> -->
      </template>
    </Column>
  </DataTable>
  <DataTable v-else>
    <Column header="#" sortable>
      <template #body>
        1
      </template>
    </Column>
    <Column field="movie_title" header="Title" sortable>
      <template #body>
        Title
      </template>
    </Column>
    <Column field="average" header="Rating" sortable>
      <template #body="props">
        <StarRatings :star="props.data.average" v-tooltip.right="{
    value: stringifyRatings(props.data),
    autoHide: false,
    pt: {
      arrow: {
        style: {
          borderRightColor: 'var(--primary-color)'
        }
      },
      text: 'bg-primary font-medium'
    }
  }" />
      </template>
    </Column>
    <Column field="review" header="Review" class=""></Column>
    <Column header="Actions">
      <template #body="props">
        <i class="pi pi-trash cursor-pointer" @click="deleteRating($event, props.data.id, props.data.movieId)"></i>
        <!-- <i class="pi pi-pencil cursor-pointer"
          @click="editRating($event, props.data.id, props.data.movieId)"></i> -->
      </template>
    </Column>
  </DataTable>
</template>

<script>
export default {
  methods: {
    deleteRating(e, ratingId, movieId) {
      console.log('deleteRating')
      console.log(ratingId)

      // remove form ui 
      // document.getElementById(ratingId).remove()
      for (let i of this.listData) {
        if (i.id == ratingId) {
          this.listData.splice(this.listData.indexOf(i), 1)
        }
      }

      for (let item of this.listData) {
        item.num = this.listData.indexOf(item) + 1;
      }

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
    },
    stringifyRatings(r) {
      let tooltipText = ``
      tooltipText += `Average: ${r.average}\n`
      tooltipText += `Acting: ${r.acting}\n`
      tooltipText += `Attraction: ${r.attraction}\n`
      tooltipText += `Cinemetography: ${r.cinemetography}\n`
      tooltipText += `Dialogue: ${r.dialogue}\n`
      tooltipText += `Directing: ${r.directing}\n`
      tooltipText += `Editing: ${r.editing}\n`
      tooltipText += `Plot: ${r.plot}\n`
      tooltipText += `Soundtrack: ${r.soundtrack}\n`
      tooltipText += `Special Effects: ${r.specialEffects}\n`
      tooltipText += `Theme: ${r.theme}\n`
      tooltipText += `Personal Score: ${r.personalScore}\n`

      return tooltipText
    }
  },
  data() {
    return {
      listData: ref()
    }
  },
  async beforeMount() {
    console.log('beforeMount')
    console.log('tableType: ', this.$props.tableType)
    let prop = this.$props.tableType
    if (prop === 'user') {
      prop += `/${this.$auth0.user.id}`
    }
    await fetch(`/api/api/${prop}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(data => {
        // if (this.$props.tableType === 'movie')
        this.listData = Object.values(data).map((obj) => { return obj })[0]
        this.listData = this.listData.sort((a, b) => { return b.average - a.average })
      })
    // this.listData = prop
    console.log(this.listData)
    for (let item of this.listData) {
      item.num = this.listData.indexOf(item) + 1;
    }
  },

}
</script>

<style scoped>
.p-datatable {
  width: 100%;
}
</style>
