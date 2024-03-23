// a utility class for resuable functions

// import bcrypt
const bcrypt = require("bcrypt");
const salt = 10;

// example
exports.utils = {
  // validation functions
  validateUsername(username) {
    // Check if the username is at least 3 characters long
    if (username.length < 3) return false;
    return true;
  },
  validateEmail(email, prisma) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return false;
    return true;
  },
  validatePassword(password) {
    // Regular expression for password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) return false;
    return true;
  },
  validateInput(input) {
    // sanitize and sterilize input
    // trim input
    return input;
  },
  // encryption
  encrypt(password) {
    // encrupt password and send it back
    return bcrypt.hashSync(password, salt);
  },
  decrypt(password, match) {
    // check if the passwords match
    return bcrypt.compareSync(password, match);
  },
  // averages
  getAverage(values) {
    let tot_acting = 0;
    let tot_attraction = 0;
    let tot_cinemetography = 0;
    let tot_dialogue = 0;
    let tot_directing = 0;
    let tot_editing = 0;
    let tot_plot = 0;
    let tot_soundtrack = 0;
    let tot_specialEffects = 0;
    let tot_theme = 0;

    let tot_values = values.length;

    for (let value of values) {
      tot_acting += value.acting;
      tot_attraction += value.attraction;
      tot_cinemetography += value.cinemetography;
      tot_dialogue += value.dialogue;
      tot_directing += value.directing;
      tot_editing += value.editing;
      tot_plot += value.plot;
      tot_soundtrack += value.soundtrack;
      tot_specialEffects += value.specialEffects;
      tot_theme += value.theme;
    }

    // update the movie with the rating contents
    let avg_acting = tot_acting / tot_values;
    let avg_attraction = tot_attraction / tot_values;
    let avg_cinemetography = tot_cinemetography / tot_values;
    let avg_dialogue = tot_dialogue / tot_values;
    let avg_directing = tot_directing / tot_values;
    let avg_editing = tot_editing / tot_values;
    let avg_plot = tot_plot / tot_values;
    let avg_soundtrack = tot_soundtrack / tot_values;
    let avg_specialEffects = tot_specialEffects / tot_values;
    let avg_theme = tot_theme / tot_values;

    // total of the averages
    const totalAvgs =
      avg_acting +
      avg_attraction +
      avg_cinemetography +
      avg_dialogue +
      avg_directing +
      avg_editing +
      avg_plot +
      avg_soundtrack +
      avg_specialEffects +
      avg_theme;

    let averages = [
      avg_acting,
      avg_attraction,
      avg_cinemetography,
      avg_dialogue,
      avg_directing,
      avg_editing,
      avg_plot,
      avg_soundtrack,
      avg_specialEffects,
      avg_theme,
    ];

    // get rid of 0's
    for (let average of averages) {
      if (average == 0) averages.splice(averages.indexOf(average), 1);
    }

    data = {
      avg_overall: averages.length == 0 ? 0 : averages.length,
      avg_acting: avg_acting == null ? 0 : avg_acting,
      avg_attraction: avg_attraction == null ? 0 : avg_attraction,
      avg_cinemetography: avg_cinemetography == null ? 0 : avg_cinemetography,
      avg_dialogue: avg_dialogue == null ? 0 : avg_dialogue,
      avg_directing: avg_directing == null ? 0 : avg_directing,
      avg_editing: avg_editing == null ? 0 : avg_editing,
      avg_plot: avg_plot == null ? 0 : avg_plot,
      avg_soundtrack: avg_soundtrack == null ? 0 : avg_soundtrack,
      avg_specialEffects: avg_specialEffects == null ? 0 : avg_specialEffects,
      avg_theme: avg_theme == null ? 0 : avg_theme,
    };

    return data;
  },
};
