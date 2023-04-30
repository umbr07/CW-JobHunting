const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class UserDto {
  Email;
  Phone;
  FirstName;
  LastName;
  Role;

  constructor(model) {
    this.Mail = model.Mail;
    this.Phone = model.Phone;
    this.FirstName = model.FirstName;
    this.LastName = model.LastName;
    this.Role = model.Role;
  }
};
