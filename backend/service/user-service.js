const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, phone, fname, lname) {
    const candidate = await prisma.users.findFirst({ where: { Mail: email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует!`
      );
    }
    const salt = bcrypt.genSaltSync(3);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await prisma.users.create({
      data: {
        Mail: email,
        Password: hashPassword,
        Phone: phone,
        FirstName: fname,
        LastName: lname,
      },
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.Mail, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await prisma.users.findFirst({ where: { Mail: email } });
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

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new UserService();
