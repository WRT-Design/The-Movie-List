/*
Server stuff to accomplish today
  1. User
  7. Star
  3. Settings
  8. Follows
  2. Movie     TODO:
  4. Ratings   TODO:
  5. Post      TODO:
  6. Comment   TODO:


*/

const headers = {
  "Content-Type": "application/json",
};
const url = "http://localhost:8080";
const ep = "/api";
const userId1 = "65d54aec0bc3558436646232";
const userId2 = "65f9f86220f26d34b965d9f1";
const postId = "65e009a44e6777949abd49dd";

// testEndpoints();
async function testEndpoints() {
  let post;
  // post
  // const postResult = await fetch(`${url}${ep}/post`, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     user: userId,
  //     post: "test post content",
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     post = result.post;
  //   });
  // console.log("POST Result Status: ", post);
  // // get a single
  // const getSingleResult = await fetch(`${url}${ep}/post/${userId}`, {
  //   method: "GET",
  //   headers: headers,
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     user = result.user;
  //   });
  // console.log("GET Single Result User: ", user);
  // get all
  // const getAllResult = await fetch(`${url}${ep}/post`, {
  //   method: "GET",
  //   headers: headers,
  // });
  // console.log("GET All Result Status: ", getAllResult.status);
  // console.log("GET All Result: ", getAllResult);
  // put
  const putResult = await fetch(
    `${url}${ep}/post/${postId}?type=newStar&userId=${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("PUT Result Status: ", putResult.status);
  // delete
  // const delResult = await fetch(`${url}${ep}/post/${post.id}`, {
  //   method: "DELETE",
  //   headers: headers,
  // });
  // console.log("DELETE Result Status: ", delResult.status);
}

// testStarEndpoints("star");
async function testStarEndpoints(point) {
  let star;
  // post
  const postResult = await fetch(`${url}${ep}/${point}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      user: userId1,
      type: "post",
      postId: postId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      star = result.star;
    });
  console.log("POST Result Status: ", star);

  // get all stars for a user
  let getAllResult;
  await fetch(`${url}${ep}/${point}/${userId}&userId`, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((result) => {
      getAllResult = result.result;
    });
  console.log("GET All Result Status: ", getAllResult);
  // console.log("GET All Result: ", getAllResult);

  // put
  // let putResult;
  // await fetch(`${url}${ep}/${point}/${star.id}?type=newStar&userId=${userId}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     putResult = result.message;
  //   });
  // console.log("PUT Result Status: ", putResult);

  // delete one
  // let delResult1;
  // await fetch(`${url}${ep}/${point}/${star.id}&one`, {
  //   method: "delete",
  //   headers: headers,
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     delResult1 = result.message;
  //   });
  // console.log("DELETE Result Status: ", delResult1);

  // delete all
  // let delResult2;
  // await fetch(`${url}${ep}/${point}/${postId}&all`, {
  //   method: "delete",
  //   headers: headers,
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     delResult2 = result.message;
  //   });
  // console.log("DELETE Result Status: ", delResult2);
}

testFollows();
async function testFollows() {
  // user follows another user
  // let followRes;
  // await fetch(`${url}${ep}/follows`, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     followerId: userId1,
  //     followingId: userId2,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     followRes = result;
  //   });
  // console.log(followRes);

  // user unfollows another user
  let followDelRes;
  await fetch(`${url}${ep}/follows/${userId1}&${userId2}&one`, {
    method: "DELETE",
    headers: headers,
  })
    .then((res) => res.json())
    .then((result) => {
      followDelRes = result;
    });
  console.log(followDelRes);
}

// testSettings();
async function testSettings() {
  // new settings
  // let settingsResult;
  // await fetch(`${url}${ep}/settings`, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify({
  //     user: userId1,
  //   }),
  // });

  // updated settings
  // await fetch(`${url}${ep}/settings/${userId1}&222222222`, {
  //   method: "PUT",
  //   headers: headers,
  // });

  // get settings
  // let settingsResult;
  // await fetch(`${url}${ep}/settings/${userId1}`, {
  //   method: "GET",
  //   headers: headers,
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     settingsResult = result;
  //   });
  // console.log(settingsResult);
  // dellete settings
  await fetch(`${url}${ep}/settings/${userId1}`, {
    method: "DELETE",
    headers: headers,
  });
}
