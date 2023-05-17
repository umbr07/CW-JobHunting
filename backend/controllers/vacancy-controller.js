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

  async DeleteVacancyCompany(req, res, next) {
    try {
      const { Id } = req.body;
      const Id_comp = parseInt(req.params.id);
      console.log(Id, Id_comp);
      const VacancyData = await vacancyService.deleteVacancyCompany(
        Id,
        Id_comp
      );

      return res.json(VacancyData);
    } catch (e) {
      next(e);
    }
  }

  async GetAllVacancyCompany(req, res, next) {
    try {
      const Id = parseInt(req.params.id);
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

  async VacancySearch(req, res, next) {
    try {
      const { searchTerm } = req.body;
      console.log(searchTerm);
      const VacancyData = await vacancyService.vacancySearch(searchTerm);
      return res.json(VacancyData);
    } catch (e) {
      next(e);
    }
  }

  async GetVacancyCompanyApply(req, res, next) {
    try {
      const Id_comp = parseInt(req.params.id);
      console.log(Id_comp);
      const { idVacancy } = req.body;
      console.log(idVacancy, Id_comp);
      const VacancyData = await vacancyService.vacancyCompanyApply(
        idVacancy,
        Id_comp
      );
      return res.json(VacancyData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new VacancyController();
