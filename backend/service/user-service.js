const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(login, password, phone, email, fname, lname) {
    const candidate = await prisma.users.findFirst({ where: { Mail: email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует!`
      );
    }
    const salt = bcrypt.genSaltSync(3);
    const hashPassword = bcrypt.hashSync("password123", salt);
    const user = await prisma.users.create({
      data: {
        Login: login,
        Password: hashPassword,
        Phone: phone,
        Mail: email,
        FirstName: fname,
        LastName: lname,
      },
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.Mail, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(login, password) {
    const user = await prisma.users.findFirst({ where: { Login: login } });
    if (!user) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }

    const isPassEquals = await bcrypt.compare(password, user.Password);
    if (!user) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.Mail, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
