const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ApiError = require("../exceptions/api-error");
const vacancyService = require("../service/vacancy-service");

class VacancyController {
  async createVacancy(req, res, next) {
    try {
      const { CompId, Title, Desc, Salary, Location } = req.body;
      console.log(req.body);

      const vacancyData = await vacancyService.createVacancy(
        CompId,
        Title,
        Desc,
        Salary,
        Location
      );

      return res.json(vacancyData);
    } catch (e) {
      next(e);
    }
  }

  async DeleteVacancy(req, res, next) {
    try {
      const { Id } = req.body;
      console.log(Id);
      const VacancyData = await vacancyService.deleteVacancy(Id);

      return res.json(VacancyData);
    } catch (e) {
      next(e);
    }
  }

  async GetAllVacancyCompany(req, res, next) {
    try {
      const { Id } = req.body;
      console.log(Id);
      const VacancyData = await vacancyService.GetAllVacancyCompany(Id);

      return res.json(VacancyData);
    } catch (e) {
      next(e);
    }
  }

  async ApplyVacancyUser(req, res, next) {
    try {
      const { id_vacancy, id_user } = req.body;
      console.log(id_vacancy, id_user);
      const VacancyData = await vacancyService.applyVacancyUser(
        id_vacancy,
        id_user
      );
      return res.json(VacancyData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new VacancyController();
