const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Post = function (post) {
  this.id = post.id;
  this.content = post.content;
};

Post.create = async (newPost, userId, result) => {
  console.log("postmodel");
  try {
    // primsa query here
    console.log("newPost: ", newPost);
    const postRes = await prisma.post.create({ data: newPost });
    console.log("created post");
    console.log("postRes: ", postRes);

    // connect the post
    const connectRes = await prisma.user.update({
      where: {
        id: newPost.userId,
      },
      data: {
        posts: {
          connect: {
            id: postRes.id,
          },
        },
      },
      include: {
        posts: true,
      },
    });

    return postRes;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};
Post.update = async (postId, type, userId, options) => {
  try {
    // primsa query here
    switch (type) {
      case "newStar":
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            stars: {
              connect: {
                id: userId,
              },
            },
            tot_stars: {
              increment: 1,
            },
          },
        });
        break;
      case "delStar":
        // query for the full list of stars
        const stars = await prisma.post.findMany({
          where: {
            id: postId,
          },
          include: {
            stars: true,
          },
        });
        console.log("\n\n stars: ", stars, "\n\n");
        // copy the list/remove the matching user id
        // set the data.stars to the new list
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            stars: {
              push: userId,
            },
            tot_stars: {
              decrement: 1,
            },
          },
        });
        break;
      case "newComment":
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            comments: {
              push: options.postId,
            },
          },
        });
        break;
      case "delComment":
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            userId: null,
            type: "delComment",
          },
        });
        break;
      case "newLike":
      default:
        break;
    }
    console.log("updated post");
    return true;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};
Post.findBy = async (paramName, paramVal) => {
  try {
    // primsa query here
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};
Post.getAll = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    console.log("allUsers: ", allUsers);
    return allUsers;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
Post.getAllUserPosts = async (userId) => {
  try {
    console.log("userId: ", userId);
    const allUserPosts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
    });

    return allUserPosts;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
Post.del = async (postId) => {
  try {
    // primsa query here
    console.log("Post to delete: ", postId);
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return { result: "Post deleted successfully" };
  } catch (err) {
    console.error(err);
    return { err: err };
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Post;
