const userService = require("../service/user-service");
var bodyParser = require("body-parser");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

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
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000,
        httpOnly: true,
      });

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
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { Mail, Password } = req.body;
      const userData = await userService.login(Mail, Password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000,
        httpOnly: true,
      });
      res.cookie("Mail", userData.user.Mail);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
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
      const { refreshToken, Mail } = req.cookies;
      const user = await userService.getInfo(Mail);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
