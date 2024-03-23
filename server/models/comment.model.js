const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Comment = function (comment) {
  this.id = comment.id;
};

Comment.create = async (newComment, postType) => {
  try {
    console.log("newComment: ", newComment);
    let comment = await prisma.comment.create({ data: newComment });
    console.log("created comment");

    // connect the comment to the post
    if (postType === "postId") {
      const connectResult = await prisma.post.update({
        where: {
          id: newComment.postId,
        },
        data: {
          comments: {
            connect: {
              id: comment.id,
            },
          },
        },
      });
    } else if (postType === "ratingId") {
      const connectResult = await prisma.rating.update({
        where: {
          id: newComment.postId,
        },
        data: {
          comments: {
            connect: {
              id: comment.id,
            },
          },
        },
      });
    } else if (postType === "commentId") {
      const connectResult = await prisma.comment.update({
        where: {
          id: newComment.postId,
        },
        data: {
          comments: {
            connect: {
              id: comment.id,
            },
          },
        },
      });
    }

    // connect the comment to the user
    const connectResult1 = await prisma.user.update({
      where: {
        id: newComment.userId,
      },
      data: {
        comments: {
          connect: {
            id: comment.id,
          },
        },
      },
    });

    return comment;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

Comment.update = async (commentId, updateType, options) => {
  try {
    let result;
    console.log("CommentID's");
    console.log(commentId);
    console.log(options.commentId);
    switch (updateType) {
      case "newStar":
        result = await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            stars: {
              connect: {
                id: options.starId,
              },
            },
            tot_stars: {
              increment: 1,
            },
          },
        });
        break;
      case "delStar":
        result = await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            stars: {
              disconnect: {
                id: options.starId,
              },
            },
            tot_stars: {
              decrement: 1,
            },
          },
        });
        break;
      case "newComment":
        const replyResult = await prisma.reply.create({
          data: {
            parentCommentId: commentId,
            childCommentId: options.commentId,
          },
        });
        console.log("replyResult: ", replyResult);
        result = await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            comments: {
              connect: {
                id: replyResult.id,
              },
            },
          },
        });
        break;
      case "delComment":
        result = await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            comments: {
              disconnect: {
                id: options.commentId,
              },
            },
          },
        });
        break;
      default:
    }
    console.log("updated comment");
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Comment.findOne = async (commentId) => {
  try {
    console.log("commentId: ", commentId);
    let result = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
      include: {
        comments: true,
      },
    });
    console.log("found comment");
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Comment.deleteOne = async (commentId) => {
  try {
    console.log("commentId: ", commentId);
    let result = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    console.log("deleted comment");
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Comment.deleteMany = async (userId) => {
  try {
    console.log("userId: ", userId);
    let result = await prisma.comment.deleteMany({
      where: {
        userId: userId,
      },
    });
    console.log("deleted comments");
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Comment;
