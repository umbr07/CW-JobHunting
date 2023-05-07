const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");

const generateJwt = (id, Mail, role) => {
  return jwt.sign({ id, Mail, role }, "secret12345", {
    expiresIn: "24h",
  });
};

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
    const token = generateJwt(user.Id, user.Mail, user.Role);
    return console.log(token);
  }

  async registrationCompany(
    email,
    password,
    phone,
    fname,
    lname,
    role,
    company,
    location
  ) {
    const candidate = await prisma.users.findFirst({ where: { Mail: email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Компания с почтовым адресом ${email} уже существует!`
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
        Role: 1,
        Company: {
          create: {
            NameCompany: company,
            Location: location,
          },
        },
      },
      include: { Company: true },
    });
    const userDto = new UserDto(user);
    const token = generateJwt(user.Id, user.Mail, user.Role);
    return console.log(token);

    return { user: userDto };
  }

  async login(email, password) {
    const user = await prisma.users.findFirst({ where: { Mail: email } });
    if (!user) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }

    const isPassEquals = await bcrypt.compare(password, user.Password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }
    const userDto = new UserDto(user);
    const token = generateJwt(
      user.Id,
      user.Mail,
      user.Role,
      user.FirstName,
      user.LastName,
      user.Phone
    );

    return { token, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    /* Узнать правильно работает ли, но скорее всего нет !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await prisma.users.findFirst({
      where: { Id: tokenFromDb.Id_users },
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.Mail, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  async getVacancy() {
    const vacancy = await prisma.vacancys.findMany();
    return vacancy;
  }

  async getInfo(Mail) {
    const user = await prisma.users.findFirst({
      where: { Mail: Mail },
    });
    return user;
  }

  async deleteUser(id) {
    const user = await prisma.users.findFirst({ where: { Id: id } });
    if (!user) {
      throw ApiError.BadRequest(`Пользователя с ${id} id не существует`);
    }
    const deletedUser = await prisma.users.delete({
      where: {
        Id: id,
      },
    });

    return deletedUser;
  }
}

module.exports = new UserService();
