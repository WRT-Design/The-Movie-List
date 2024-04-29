<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

import StarRatings from '../components/StarRatings.vue'

import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  tableType: String
})

</script>

<template>
  <DataTable :value="listData" sortField="num" :sortOrder="1" stripedRows>
    <Column field="num" header="#" sortable>
    </Column>
    <Column field="title" header="Title" sortable>
      <template #body="slotProps">
        <div class="flex gap-2">
          <img :src="slotProps.data.poster" height="auto" width="30rem" loading="lazy" class="surface-200" />
          <RouterLink :to="{ name: 'movie', params: { movieId: slotProps.data.api_id } }"
            class="no-underline align-content-center" style="color: var(--primary-color)">
            {{ slotProps.data.title }}
          </RouterLink>
        </div>
      </template>
    </Column>
    <Column field="avg_overall" header="Rating" sortable>
      <template #body="slotProps">
        <StarRatings :star="slotProps.data.avg_overall" v-tooltip.right="{
    value: stringifyRatings(slotProps.data),
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
    <Column field="runtime" header="Runtime" sortable>
      <template #body="slotProps">
        {{ formatSeconds(slotProps.data.runtime) }}
      </template>
    </Column>
    <Column field="genres" header="Genres">
      <template #body="slotProps">
        <Tag v-for="t in tags(slotProps.data.genres)" :value="t" severity="info" class="mx-1" />
      </template>
    </Column>
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
  methods: {
    formatSeconds(seconds) {
      const date = new Date(null);
      date.setSeconds(seconds);
      seconds = date.toISOString().slice(11, 19).split(':')
      seconds = seconds[0] + 'h ' + seconds[1] + 'm'
      return seconds
    },
    tags(genres) {
      let tags = genres.split(',').slice(0, genres.split(',').length - 1)
      return tags
    },
    stringifyRatings(r) {
      let tooltipText = ``
      tooltipText += `Average: ${r.avg_overall}\n`
      tooltipText += `Acting: ${r.avg_acting}\n`
      tooltipText += `Attraction: ${r.avg_attraction}\n`
      tooltipText += `Cinemetography: ${r.avg_cinemetography}\n`
      tooltipText += `Dialogue: ${r.avg_dialogue}\n`
      tooltipText += `Directing: ${r.avg_directing}\n`
      tooltipText += `Editing: ${r.avg_editing}\n`
      tooltipText += `Plot: ${r.avg_plot}\n`
      tooltipText += `Soundtrack: ${r.avg_soundtrack}\n`
      tooltipText += `Special Effects: ${r.avg_specialEffects}\n`
      tooltipText += `Theme: ${r.avg_theme}\n`

      return tooltipText
    }
  }

}
</script>

<style scoped>
.p-tag {
  background-color: var(--cyan-800);
  color: white;
}

.p-highlight {
  background-color: var(--cyan-800);
}

.p-menuitem-link span,
.p-button span,
.p-column-header-content span {
  margin: 3px;
}
</style>
