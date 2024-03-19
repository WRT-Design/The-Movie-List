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

    return star;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Star;
