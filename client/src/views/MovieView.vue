<script setup>
import NavC from "../components/NavC.vue";
import MLTable from "../components/MovieListTable.vue";
import StarRatings from "@/components/StarRatings.vue";

import Tag from 'primevue/tag';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { ref } from "vue";

import { useAuthStore } from '@/stores/auth-store'

const store = useAuthStore()

</script>

<template>
  <main>
    <NavC :user="store.getUser" />
    <div class="main">
      <section>
        <div class="container">
          <div class="row">
            <div class="flex p-2">
              <img v-if="movie.primaryImage" :src="movie.primaryImage.url" :alt="movie.primaryImage.caption.plainText"
                width="15%" height="auto" />
              <img v-else src="@/assets/no-poster.png" width="15%" height="auto" class="p-2" />
              <section class="flex flex-column gap-2 px-2">
                <h2 v-if="movie.titleText">{{ movie.titleText.text }}</h2>
                <h2 class="flex" v-if="dbMovie && dbMovie.avg_overall">{{ dbMovie.avg_overall }}
                  <StarRatings :star="dbMovie.avg_overall" class="mx-2" />
                </h2>
                <h2 class="flex" v-else>0 (No Ratings Yet)
                  <StarRatings class="mx-2" :star="0" />
                </h2>
                <section>
                  <b>Release Date: </b>
                  <span v-if="movie.releaseDate &&
      movie.releaseDate.month &&
      movie.releaseDate.day &&
      movie.releaseDate.year
      ">
                    {{ getMonth(movie.releaseDate.month) }}
                    {{ movie.releaseDate.day }},
                    {{ movie.releaseDate.year }}
                  </span>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Genres: </b>
                  <Tag v-if="movie.genres" v-for="m of movie.genres.genres" :value="m.text" severity="secondary"
                    class="mx-1"></Tag>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Directors: </b>
                  <span v-if="movie.directors" v-for="d of movie.directors">
                    <span v-for="d of d.credits" class="px-1">
                      {{ d.name.nameText.text }}
                    </span>
                  </span>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Writers: </b>
                  <span v-if="movie.writers" v-for="w of movie.writers">
                    <span v-for="w of w.credits" class="px-1">
                      {{ w.name.nameText.text }}
                    </span>
                  </span>
                  <span v-else>None</span>
                </section>
                <section>
                  <b>Plot: </b>
                  <span v-if="movie.plot &&
      movie.plot.plotText &&
      movie.plot.plotText.plainText
      ">{{ movie.plot.plotText.plainText }}</span>
                  <span v-else>None</span>
                </section>
              </section>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 d-flex p-2">
              <Accordion :activeIndex="1">
                <AccordionTab header="Average Scores and Rating Tips">
                  <Accordion :multiple="true" :activeIndex="[]">
                    <AccordionTab v-for="card of scoreCards" :header="card.ratingName + ': ' + card.ratingScore">
                      <p>{{ card.ratingInfo }}</p>
                    </AccordionTab>
                  </Accordion>
                </AccordionTab>
              </Accordion>
            </div>
          </div>
          <div class="col-md-12 d-flex p-2">
            <div class="row">
              <Divider align="left" type="solid">
                <b>Movie Ratings</b>
              </Divider>
              <DataTable :value="movieRatings" removableSort>
                <Column header="User">
                  <template #body="props">
                    <RouterLink :to="'/profile/' + usernameMatch(props.data.userId)" class="no-underline text-primary">
                      {{ idMatch(props.data.userId) }}
                    </RouterLink>
                  </template>
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
                <!-- TOOLTIP WITH OTHER RATING INFO ^^^ -->
                <Column field="review" header="Review"></Column>
                <Column field="createdDate" header="Date" sortable>
                  <template #body="props">
                    {{ dateFormat(props.data.createdDate) }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      movie: ref(""),
      dbMovie: ref(""),
      ratings: ref({}),
      scoreCards: ref([]),
      infos: [
        {
          name: 'Overall',
          info: `This is the overall rating of the movie. This is calculated by taking the average scores for each category of the movie, then averaging those out.`
        },
        {
          name: 'Acting',
          info: `Evaluate the performances of the actors based on their ability to embody the characters, convey emotions convincingly, and engage the audience throughout the film. Look for authenticity, depth, and believability in their portrayal of the characters' personalities and motivations.`
        },
        {
          name: 'Attraction',
          info: `Assess the overall appeal of the movie, including the chemistry between characters, the emotional connection with the audience, and the entertainment value. Consider factors such as likability of characters, relatability of their experiences, and the ability of the storyline to captivate and engage viewers.`
        },
        {
          name: 'Cinemetography',
          info: `Examine the visual aspects of the film, focusing on the composition, lighting, camera angles, and use of color and visual effects. Evaluate how these elements contribute to the storytelling, mood, and atmosphere of the movie, as well as their aesthetic quality and technical proficiency.`
        },
        {
          name: 'Directing',
          info: `Evaluate the director's ability to bring the screenplay to life through effective storytelling techniques, creative vision, and skillful guidance of the cast and crew. Consider aspects such as pacing, tone, visual style, and thematic coherence in assessing the director's contribution to the overall impact and effectiveness of the film.`
        },
        {
          name: 'Dialogue',
          info: `Assess the quality, authenticity, and significance of the dialogue in conveying character dynamics, plot development, and thematic elements. Evaluate the naturalness of the dialogue delivery, its relevance to the storyline, and its ability to enhance character development and audience engagement.`
        },
        {
          name: 'Editing',
          info: `Examine the pacing, rhythm, and structure of the film, as well as the seamless integration of different scenes, transitions, and visual elements. Evaluate the effectiveness of the editing in maintaining coherence, clarity, and emotional impact throughout the movie.`
        },
        {
          name: 'Plot',
          info: `Analyze the storyline, character arcs, and narrative structure of the film, focusing on its originality, complexity, and coherence. Assess the effectiveness of the plot in engaging the audience, generating suspense or surprise, and delivering meaningful themes or messages.`
        },
        {
          name: 'Special Effects',
          info: `Evaluate the use of visual and practical effects to create immersive and visually stunning sequences, as well as their integration with the storyline and overall aesthetic of the film. Consider the creativity, realism, and impact of the special effects in enhancing the movie's visual spectacle and storytelling.`
        },
        {
          name: 'Soundtrack',
          info: `Assess the musical score, sound design, and use of sound effects to enhance the mood, atmosphere, and emotional resonance of the film. Evaluate the effectiveness of the soundtrack in complementing the visuals, conveying themes or emotions, and immersing the audience in the cinematic experience.`
        },
        {
          name: 'Theme',
          info: `Examine the underlying ideas, messages, or philosophical concepts explored in the film, as well as their relevance, depth, and resonance with the audience. Evaluate how effectively the movie conveys its thematic elements through storytelling, character development, and visual symbolism.`
        }
      ],
      movieRatings: ref([]),
      users: ref([])
    };
  },
  methods: {
    getMonth(month) {
      switch (month) {
        case 1:
          return "January";
        case 2:
          return "February";
        case 3:
          return "March";
        case 4:
          return "April";
        case 5:
          return "May";
        case 6:
          return "June";
        case 7:
          return "July";
        case 8:
          return "August";
        case 9:
          return "September";
        case 10:
          return "October";
        case 11:
          return "November";
        case 12:
          return "December";
      }
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
    },
    parseRatings(m) {
      for (let key in this.dbMovie) {
        if (key.toString().startsWith("avg_")) {
          this.ratings[key] = m[key];
        }
      }
      for (let key in this.ratings) {
        let name = key.toString().slice(4)
        name = name.charAt(0).toUpperCase() + name.slice(1)
        if (!this.scoreCards.find((el) => el.ratingName == name)) {
          let info = ""
          for (let i of this.infos) {
            if (i.name == name) {
              info = i.info
            }
          }
          this.scoreCards.push({
            ratingName: name,
            ratingScore: this.ratings[key],
            ratingInfo: info
          })
        }
      }
    },
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
    try {
      await fetch(`/api/api/moviesAPI/title/${this.$route.params.movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.movie = data.results;
        });
      console.log(this.movie);

      await fetch(`/api/api/movie/${this.$route.params.movieId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.dbMovie = data.movie;
        });

      console.log(this.dbMovie);
      this.parseRatings(this.dbMovie);

      // get the movie's ratings 
      await fetch(`/api/api/rating/movie?id=${this.dbMovie.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.movieRatings = data.result;
          console.log(this.movieRatings);
        });

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

    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.p-tag {
  background-color: var(--cyan-800);
  color: white;
}
</style>
