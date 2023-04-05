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
      const { Login, Password, Phone, Mail, FirstName, LastName } = req.body;
      console.log(req.body);
      const userData = await userService.registration(
        Login,
        Password,
        Phone,
        Mail,
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

  async login(req, res, next) {
    try {
      const { Login, Password } = req.body;
      const userData = await userService.login(Login, Password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async GetAllUsers(req, res, next) {
    try {
      res.json(["123"]);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
