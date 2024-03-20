const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Settings = function (settings) {
  this.id = settings.id;
};

Settings.create = async (newSettings) => {
  try {
    console.log("newSettings: ", newSettings);
    let settings = await prisma.settings.create({ data: newSettings });
    console.log("created settings");
    return settings;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

Settings.update = async (id, code) => {
  try {
    await prisma.settings.updateMany({
      where: {
        userId: id,
      },
      data: {
        code: code,
      },
    });
    console.log("updated settings");
    return true;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

Settings.findOne = async (userId) => {
  try {
    let settings = await prisma.settings.findFirst({
      where: {
        userId: userId,
      },
    });
    console.log("found settings");
    return settings;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

Settings.del = async (userId) => {
  try {
    await prisma.settings.deleteMany({
      where: {
        userId: userId,
      },
    });
    console.log("deleted settings");
    return true;
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = Settings;
