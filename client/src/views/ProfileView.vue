<script setup>
import NavC from "../components/NavC.vue";
import Post from "../components/PostC.vue";
import Rating from "../components/RatingC.vue";
import RatingTable from "../components/RatingTable.vue";
import PostTable from "../components/PostTable.vue";

import { Modal } from "bootstrap";
import { reactive, onMounted } from "vue";
import { ref } from "vue";

const state = reactive({
  modal_edit_profile: null,
});

onMounted(() => {
  state.modal_edit_profile = new Modal("#modal_edit_profile", {});
});

function openModal(type) {
  if (type == "ep") state.modal_edit_profile.show();
}

function closeModal(type) {
  if (type == "ep") state.modal_edit_profile.hide();
}

defineProps(['authUsername'])
</script>

<template>
  <NavC @post="newPost" @rating="newRating" />
  <div class="profile">
    <div class="p-2">
      <section class="d-flex p-2">
        <img v-if="dbUser.picture" :src="dbUser.picture" alt="avatar" width="200px" height="200px" />
        <img v-else src="@/assets/annon_avatar.jpg" alt="avatar" width="200px" height="200px" />
        <section class="p-2">
          <h2>{{ dbUser.first_name }}</h2>
          <h4 class="text-white-50">@{{ dbUser.username }}</h4>
          <p>Bio: {{ bio }}</p>
        </section>
      </section>
      <section class="d-flex justify-content-between">
        <div class="p-2">
          <a class="plain p-3 text-white">{{ followersCount }} Followers</a>
          <a class="plain text-white">{{ followingCount }} Following</a>
        </div>
        <button v-if="auth && user.nickname != dbUser.username" type="button" class="btn btn-primary btn-light m-2"
          @click="createFollow">Follow</button>
        <!-- <button v-if="auth && user.nickname != dbUser.username && userFollows()" type="button"
          class="btn btn-primary btn-light m-2" @click="createFollow">Unfollow</button> -->

      </section>
      <section class="p-2">
        <!-- Open a modal for profile editing -->
        <button v-if="auth && user.nickname == dbUser.username" type="button" class="btn btn-primary btn-light mr-2"
          @click="openModal('ep')">Edit Profile</button>
        <button type="button" class="btn btn-primary btn-light mx-2" @click="shareLink">Share Profile</button>
      </section>
    </div>

    <div class="profile-view">
      <button type="button" class="ml-btn active" @click="showSection('ml')">
        Your Movie List
      </button>
      <button type="button" class="wl-btn" @click="showSection('wl')">
        Your Watchlist
      </button>
      <button type="button" class="pl-btn" @click="showSection('pl')">
        Your Posts
      </button>
    </div>

    <RatingTable v-if="dbUser && sections.ml" :table-type="'rating/user?id=' + dbUser.id" class="d-flex" />

    <div class="posts" v-if="sections.pl">
      <ul>
        <Post v-for="post in posts" v-bind:key="post.id" :content="post.content" :postId="post.id" :name="user.name"
          :username="user.nickname" :date="dateFormat(post.createdDate)">
        </Post>
      </ul>
    </div>
  </div>

  <!-- Edit Profile Modal -->
  <div class="modal fade" id="modal_edit_profile" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">Edit Profile</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal('ep')"></button>
        </div>
        <div class="modal-body d-flex flex-column">
          <label class="m-2">Upload Profile Picture:
            <input type="file" accept="image/png, image/jpeg" @change="checkFileSize" /></label>
          <textarea v-model="bio" class="bio m-2" placeholder="Tell people a little about yourself."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal('ep')">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="
    closeModal('ep');
  saveProfile();
  ">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: ref(this.$auth0.isAuthenticated),
      authId: null,
      user: ref(this.$auth0.user),
      dbUser: ref(""),
      posts: ref([]),
      sections: ref({
        ml: true,
        wl: false,
        pl: false,
      }),
      bio: ref(""),
      userRatings: ref(""),
      followers: ref([]),
      following: ref([]),
      followersCount: ref(0),
      followingCount: ref(0),
    };
  },
  async beforeMount() {
    // use this to check if a user is already logged in
    console.log(this.$auth0.user.nickname);

    let user;
    await fetch(`/api/api/user/${this.$route.params.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        user = result.user;
        console.log(user);
      });

    this.dbUser = user;
    this.bio = user.bio;

    this.getRatings(user.id);
    this.getPosts(user.id);

    // get the followers and following for the user 
    await fetch(`/api/api/follows/followers/${this.dbUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        this.followers = result.follows;
        this.followersCount = this.followers.length
      });

    await fetch(`/api/api/follows/following/${this.dbUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        this.following = result.follows;
        this.followingCount = this.following.length
      });
  },
  methods: {
    authCheck() {
      console.log("user: ", this.user);
    },
    showSection(sec) {
      const mlBtn = document.querySelector(".ml-btn");
      const wlBtn = document.querySelector(".wl-btn");
      const plBtn = document.querySelector(".pl-btn");
      switch (sec) {
        case "ml":
          this.sections.ml = true;
          this.sections.wl = false;
          this.sections.pl = false;
          mlBtn.classList.add("active");
          wlBtn.classList.remove("active");
          plBtn.classList.remove("active");
          break;
        case "wl":
          this.sections.ml = false;
          this.sections.wl = true;
          this.sections.pl = false;
          mlBtn.classList.remove("active");
          wlBtn.classList.add("active");
          plBtn.classList.remove("active");
          break;
        case "pl":
          this.sections.ml = false;
          this.sections.wl = false;
          this.sections.pl = true;
          mlBtn.classList.remove("active");
          wlBtn.classList.remove("active");
          plBtn.classList.add("active");
          break;
      }
    },
    async getRatings(userId) {
      await fetch(`/api/api/rating/user?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          this.userRatings = result.result;
        });
      console.log("this.userRatings: ", this.userRatings);
    },
    newRating() {
      this.getRatings(this.dbUser.id);
    },
    async getPosts(userId) {
      await fetch(`/api/api/post/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((result) => {
          this.posts = result.result.reverse();
        });

      console.log("this.posts: ", this.posts);
    },
    newPost() {
      this.getPosts(this.dbUser.id);
    },
    saveProfile() {
      const userId = this.dbUser.id;
      const bio = this.bio;

      fetch(`/api/api/user/${userId}?bio=${bio}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    },
    shareLink() {
      console.log("shareLink");
      console.log(this.$route.fullPath)
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
    checkFileSize(event) {
      const input = event.srcElement;
      if (input.files && input.files[0]) {
        var fSize = input.files[0].size;
        var mSize = 16 * 1024 * 1024;

        if (fSize > mSize) {
          alert(
            "File size exceeds the maximum limit (16MB). Please choose a smaller file."
          );
          // Clear the file input to allow the user to choose a different file
          input.value = "";
        } else {
          console.log(
            "File size is good at ",
            (fSize / 1048576).toFixed(1),
            " MB"
          );
        }
      }
    },
    createFollow() {
      const followerUsername = this.user.nickname; // user logged in
      const followingId = this.dbUser.id; // profile you're viewing

      const body = {
        followerUsername: followerUsername,
        followingId: followingId,
      }

      fetch(`/api/api/follows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    },
    async userFollows() {
      if (!this.authId) {
        await fetch(`/api/api/user/${this.$auth0.user.nickname}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            this.authId = result.id;
            console.log(this.authId);
          });
      }
      for (let follower of this.followers) {
        if (follower.id == this.authId) {
          return true;
        }
      }
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

thead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid white;
  width: 100%;
}

thead th {
  padding: 0.25rem 2.5rem 0.25rem 0;
  text-align: right;
}

thead tr {
  margin-left: 2rem;
}

tbody td {
  border: 1px solid #cccccc;
  padding: 8px 15px 8px 15px;
  text-align: center;
}

.rotated-th {
  height: 110px;
  position: relative;
}

.rotated-th__label {
  bottom: 5px;
  left: 50%;
  position: absolute;
  transform: rotate(-45deg);
  transform-origin: center left;
  white-space: nowrap;
  border-bottom: solid 1px white;
  padding: 0 1rem 0 0;
}

#movie {
  vertical-align: bottom;
}

#movie span {
  margin-left: 1rem;
  margin-right: 4rem;
}

.profile-info {
  display: flex;
  flex-direction: row;
  padding: 1rem;
}

.profile-info section {
  padding: 0.5rem;
}

.profile-info h2 {
  padding-bottom: 0.1rem;
  margin: 0;
}

.profile-info h4 {
  color: rgb(194, 194, 194);
}

.profile-view {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.profile-view button {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid var(--tml-orange);
  color: var(--tml-orange);
  padding: 0.5rem;
  width: 100%;
}

.active {
  font-family: "Caveat";
  font-size: 1.5rem;
}

.posts ul {
  padding: 0;
}

.posts li {
  list-style-type: none;
  border: solid 1px white;
  padding: 0.5rem;
}

#delBtnPost {
  float: right;
}

.plain {
  text-decoration: none;
}
</style>
