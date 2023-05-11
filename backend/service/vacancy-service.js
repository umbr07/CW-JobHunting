const { PrismaClient } = require("@prisma/client");
const { json } = require("body-parser");
const prisma = new PrismaClient();

class VacancyService {
  async createVacancy(CompId, Title, Desc, Salary, Location) {
    const vacancy = await prisma.Vacancys.create({
      data: {
        Id_company: CompId,
        Job_title: Title,
        Description: Desc,
        Salary: Salary,
        Location: Location,
      },
    });
    console.log(vacancy);
  }

  async deleteVacancy(id) {
    const vacancy = await prisma.vacancys.findFirst({ where: { Id: id } });
    if (!vacancy) {
      throw ApiError.BadRequest(`Вакансии с ${id} id не существует`);
    }
    const deletedVacancy = await prisma.vacancys.delete({
      where: {
        Id: id,
      },
    });

    return deletedVacancy;
  }

  async GetAllVacancyCompany(Id) {
    const vacancy = await prisma.vacancys.findMany({
      where: {
        Id_company: Id,
      },
    });
    return vacancy;
  }

  async applyVacancyUser(id_vacancy, id_user) {
    const vacancy = await prisma.RespondVacancies.create({
      data: {
        Id_vacancies: id_vacancy,
        Id_user: id_user,
      },
    });
    return vacancy;
  }
}

module.exports = new VacancyService();
