const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class UserDto {
  Login;
  Email;
  Phone;
  FirstName;
  LastName;

  constructor(model) {
    this.Login = model.Login;
    this.Mail = model.Mail;
    this.Phone = model.Phone;
    this.FirstName = model.FirstName;
    this.LastName = model.LastName;
  }
};
