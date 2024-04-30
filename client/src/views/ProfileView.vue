<script setup>
import NavC from "../components/NavC.vue";
import Post from "../components/PostC.vue";
import RatingTable from "../components/RatingTable.vue";

import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import TabMenu from 'primevue/tabmenu';

import { ref } from "vue";

import { useAuthStore } from '@/stores/auth-store'

const store = useAuthStore()

defineProps(['authUsername'])
</script>

<template>
  <NavC @post="newPost" @rating="newRating" />
  <div class="profile">
    <div class="p-2">
      <section class="flex p-2">
        <img v-if="dbUser.picture" :src="dbUser.picture" alt="avatar" width="200px" height="200px" />
        <img v-else src="@/assets/annon_avatar.jpg" alt="avatar" width="200px" height="200px" />
        <section class="p-2">
          <h2>{{ dbUser.first_name }}</h2>
          <h4 class="text-white-50">@{{ dbUser.username }}</h4>
          <p>Bio: {{ bio }}</p>
        </section>
      </section>
      <section class="flex justify-content-between">
        <div class="p-2">
          <a class="plain p-3 text-white">{{ followersCount }} Followers</a>
          <a class="plain text-white">{{ followingCount }} Following</a>
        </div>
        <Button v-if="auth && !isFollowing(store.getUser) && store.getUser.nickname != dbUser.nickname" type="button"
          class="btn btn-primary btn-light m-2" @click="createFollow">Follow</Button>
        <Button v-if="auth && isFollowing(store.getUser) && userFollows() && store.getUser.nickname != dbUser.nickname"
          type="button" class="btn btn-primary btn-light m-2" @click="deleteFollow">Unfollow</Button>

      </section>
      <section class="p-2">
        <Button v-if="auth && user.nickname == dbUser.username" type="button" class=""
          @click="visible = true; console.log('click')" outlined>Edit
          Profile</Button>
        <Button class="btn btn-primary btn-light mx-2" @click="shareLink" outlined>Share Profile</Button>
      </section>
    </div>

    <div class="profile-view">
      <TabMenu :model="pSections" />
    </div>

    <RatingTable v-if="dbUser && sections.ml" :table-type="'rating/user?id=' + dbUser.id" class="flex w-full" />

    <div class="posts" v-if="sections.pl">
      <Post v-for="post in posts" v-bind:key="post.id" :content="post.content" :postId="post.id" :name="user.name"
        :username="user.nickname" :date="dateFormat(post.createdDate)" class="m-1 border-solid border-primary">
      </Post>
    </div>
  </div>

  <!-- Edit Profile Dialog -->
  <Dialog v-model:visible="visible" :position="'top'" modal header="Edit Profile" :style="{ width: '25rem' }">
    <div class="flex flex-column align-items-center gap-3 mb-3">
      <label for="bio">Change Your Bio</label>
      <Textarea v-model="bio" name="bio" class="w-full" rows="5"
        placeholder="Tell people a little about yourself."></Textarea>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button label="Cancel" severity="secondary" icon="pi pi-times" @click="visible = false"></Button>
      <Button label="Save" severity="primary" icon="pi pi-check" @click="visible = false; saveProfile()"></Button>
    </div>
  </Dialog>
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
      visible: ref(false),
      following: ref(false),
      pSections: ref([
        {
          label: 'Movie List', icon: 'pi pi-trophy', command: () => {
            this.showSection('ml')
          }
        },
        // {
        //   label: 'Watch List', icon: 'pi pi-video', command: () => {
        //     this.showSection('wl')
        //   }
        // },
        {
          label: 'Post List', icon: 'pi pi-thumbtack', command: () => {
            this.showSection('pl')
          }
        },
      ])
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

    // get the ratings for the given user 

    // get the posts for a given user 

  },
  methods: {
    authCheck() {
      console.log("user: ", this.user);
    },
    isFollowing(user) {
      return this.followers.some(follow => follow.follower_id == user.id)
    },
    showSection(sec) {
      switch (sec) {
        case "ml":
          this.sections.ml = true;
          this.sections.wl = false;
          this.sections.pl = false;
          break;
        case "wl":
          this.sections.ml = false;
          this.sections.wl = true;
          this.sections.pl = false;
          break;
        case "pl":
          this.sections.ml = false;
          this.sections.wl = false;
          this.sections.pl = true;
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
    },
    async deleteFollow() {
      const followerUsername = this.user.nickname; // user logged in
      const followingId = this.dbUser.id; // profile you're viewing
      let followerId

      // get the logged in user infor from the database 
      await fetch(`/api/api/user/${followerUsername}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
          followerId = result.user.id;
        })

      await fetch(`/api/api/follows/${followerId}&${followingId}&one`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    }
  }
}
</script>

<style scoped>
.p-menuitem-link span,
.p-button span,
.p-column-header-content span {
  margin: 3px;
}

/* table {
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
} */
</style>
