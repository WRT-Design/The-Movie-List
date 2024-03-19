const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Star = function (star) {
  this.id = star.id;
};

Star.create = async (newStar, type) => {
  try {
    console.log("newStar: ", newStar);
    let star = await prisma.star.create({ data: newStar });
    console.log("created star");

    const connectResult1 = await prisma.user.update({
      where: {
        id: newStar.userId,
      },
      data: {
        stars: {
          connect: {
            id: star.id,
          },
        },
      },
    });
    if (type === "post") {
      const connectResult2 = await prisma.post.update({
        where: {
          id: newStar.postId,
        },
        data: {
          stars: {
            connect: {
              id: star.id,
            },
          },
        },
      });
    }
    if (type === "comment") {
      const connectResult2 = await prisma.comment.update({
        where: {
          id: newStar.postId,
        },
        data: {
          stars: {
            connect: {
              id: star.id,
            },
          },
        },
      });
    }
    if (type === "rating") {
      const connectResult2 = await prisma.rating.update({
        where: {
          id: newStar.postId,
        },
        data: {
          stars: {
            connect: {
              id: star.id,
            },
          },
        },
      });
    }

    return star;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Star.getAllStars = async (id, type) => {
  try {
    console.log("id: ", id);
    console.log("type: ", type);
    const allStars = await prisma.star.findMany({
      where: {
        [type]: id,
      },
    });
    return allStars;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Star.deleteOne = async (starId) => {
  try {
    console.log("starId: ", starId);
    let result = await prisma.star.delete({
      where: {
        id: starId,
      },
    });
    console.log("deleted star");
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Star.deleteAll = async (postId) => {
  try {
    console.log("postId: ", postId);
    let result = await prisma.star.deleteMany({
      where: {
        postId: postId,
      },
    });
    console.log("deleted stars");
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Star;
