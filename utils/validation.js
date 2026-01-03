const validator = require("validator");
const UserValidation = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Not a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};
module.exports = {
  UserValidation,
};
