/*
Server stuff to accomplish today
  1. User
  2. Movie  TODO:
  3. Settings  TODO:
  4. Ratings  TODO:
  5. Post  TODO:
  6. Comment  TODO:
                          7. Star  TODO:
  8. Follower  TODO:


*/

const headers = {
  "Content-Type": "application/json",
};
const url = "http://localhost:8080";
const ep = "/api";
const userId = "65d54aec0bc3558436646232";
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

testStarEndpoints();
async function testStarEndpoints() {
  let star;
  // post
  const postResult = await fetch(`${url}${ep}/star`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      user: userId,
      type: "post",
      postId: postId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      post = result.post;
    });
  console.log("POST Result Status: ", post);
}
