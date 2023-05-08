const userService = require("../service/user-service");
var bodyParser = require("body-parser");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");

const generateJwt = (id, Mail, role) => {
  return jwt.sign({ id, Mail, role }, "secret12345", {
    expiresIn: "24h",
  });
};

const generateJwtCheck = (id, Mail, role, fname, lname, phone) => {
  return jwt.sign({ id, Mail, role, fname, lname, phone }, "secret12345", {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { Mail, Password, Phone, FirstName, LastName } = req.body;
      console.log(req.body);
      const userData = await userService.registration(
        Mail,
        Password,
        Phone,
        FirstName,
        LastName
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async regCompany(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const {
        Mail,
        Password,
        Phone,
        FirstName,
        LastName,
        Role,
        NameCompany,
        Location,
      } = req.body;
      console.log(req.body);
      const userData = await userService.registrationCompany(
        Mail,
        Password,
        Phone,
        FirstName,
        LastName,
        Role,
        NameCompany,
        Location
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { Mail, Password } = req.body;
      const userData = await userService.login(Mail, Password);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async check(req, res, next) {
    const token = generateJwtCheck(
      req.user.id,
      req.user.Mail,
      req.user.role,
      req.user.fname,
      req.user.lname,
      req.user.phone
    );
    return res.json({ token });
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async GetAllUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async GetAllVacancy(req, res, next) {
    try {
      const vacancy = await userService.getVacancy();
      return res.json(vacancy);
    } catch (e) {
      next(e);
    }
  }

  async getInfoUser(req, res, next) {
    try {
      const { Mail } = req.cookies;
      const user = await userService.getInfo(Mail);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async DeleteUsers(req, res, next) {
    try {
      const { Id } = req.body;
      const userData = await userService.deleteUser(Id);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
