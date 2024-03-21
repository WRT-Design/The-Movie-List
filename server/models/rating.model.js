const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Rating = function (rating) {
  this.id = rating.id;
};

Rating.create = async (newRating) => {
  try {
    console.log("newRating: ", newRating);
    let rating = await prisma.rating.create(newRating);
    console.log("created rating");
    return rating;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Rating.getAllRatings = async (type, id) => {
  try {
    console.log("id: ", id);
    const allRatings = await prisma.rating.findMany({
      where: {
        [type]: id,
      },
    });

    return allRatings;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

Rating.update = async (ratingId, fields, type) => {
  try {
    let result;
    if (!type) {
      result = await prisma.rating.update({
        where: {
          id: ratingId,
        },
        data: fields,
      });
    } else if (type === "newStar") {
      result = await prisma.rating.update({
        where: {
          id: ratingId,
        },
        data: {
          tot_stars: {
            increment: 1,
          },
          stars: {
            push: fields.starId,
          },
        },
      });
    } else if (type === "delStar") {
      // get the star array from the rating
      const res = await prisma.rating.findUnique({
        where: {
          id: ratingId,
        },
        select: {
          stars: true,
        },
      });
      const stars = res.stars;
      console.log("stars: ", stars);
      // delete the star with the matching id from the array
      let index = stars.indexOf(fields.starId);
      if (index !== -1) {
        stars.splice(index, 1);
      }
      // update the rating with the new array
      result = await prisma.rating.update({
        where: {
          id: ratingId,
        },
        data: {
          stars: stars,
          tot_stars: {
            decrement: 1,
          },
        },
      });
    }
    console.log("updated rating");

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

Rating.del = async (ratingId) => {
  try {
    console.log("Rating to delete: ", ratingId);
    await prisma.rating.delete({
      where: {
        id: ratingId,
      },
    });
    return { result: "Rating deleted successfully" };
  } catch (err) {
    console.error(err);
    return { err: err };
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Rating;
