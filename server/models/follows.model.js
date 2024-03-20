const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Follows = function (follows) {
  this.id = follows.id;
};

Follows.create = async (newFollows) => {
  try {
    console.log("newFollows: ", newFollows);
    let follows = await prisma.follows.create({ data: newFollows });
    console.log("created follows");
    return follows;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

Follows.deleteOne = async (delId, otherId) => {
  try {
    console.log("delId: ", delId);
    let result = await prisma.follows.deleteMany({
      where: {
        AND: {
          followerId: delId,
          followingId: otherId,
        },
      },
    });
    console.log("deleted follows");
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

Follows.deleteAll = async (delId) => {
  try {
    console.log("delId: ", delId);
    let result = await prisma.follows.deleteMany({
      where: {
        followerId: delId,
      },
    });
    console.log("deleted follows");
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Follows;
