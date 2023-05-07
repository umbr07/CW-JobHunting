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
}

module.exports = new VacancyController();
