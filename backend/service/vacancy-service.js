const { PrismaClient } = require("@prisma/client");
const { json } = require("body-parser");
const prisma = new PrismaClient();

class VacancyService {
  async createVacancy(CompId, Title, Desc, Salary, Location) {
    const company_id = await prisma.company.findFirst({
      where: {
        Id_company: CompId,
      },
    });
    if (!company_id) {
      throw ApiError.BadRequest("Компании с таким id не существует");
    }
    if (Title === "") {
      throw ApiError.BadRequest(`Заполните все поля`);
    }
    if (Desc === "") {
      throw ApiError.BadRequest(`Заполните все поля`);
    }
    if (Salary === "") {
      throw ApiError.BadRequest(`Заполните все поля`);
    }
    if (Location === "") {
      throw ApiError.BadRequest(`Заполните все поля`);
    }
    if (
      Title.trim().length === 0 ||
      Desc.trim().length === 0 ||
      Salary.trim().length === 0 ||
      Location.trim().length === 0
    ) {
      throw ApiError.BadRequest("Заполните все поля");
    }
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

  async deleteVacancyCompany(id, id_comp) {
    const vacancy = await prisma.vacancys.findFirst({
      where: {
        Id_company: id_comp,
        Id: id,
      },
    });
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

  async getAllVacancyApplyUser(Id) {
    const vacancy = await prisma.RespondVacancies.findMany({
      where: {
        Id_user: Id,
      },
      include: { Vacancys: true },
    });
    if (!vacancy) {
      throw ApiError.BadRequest(`У пользователя нету откликов на вакансии`);
    }
    return vacancy;
  }

  async applyVacancyUser(id_vacancy, id_user) {
    const userApply = await prisma.RespondVacancies.findFirst({
      where: {
        Id_vacancies: id_vacancy,
        Id_user: id_user,
      },
    });
    if (userApply) {
      throw ApiError.BadRequest(`Вы уже откликались на эту вакансию`);
    }
    const user = await prisma.users.findFirst({
      where: {
        Id: id_user,
      },
    });
    if (user.Role === 2) {
      throw ApiError.BadRequest(`Вы не можете откликнуться на эту вакансию`);
    }
    if (user.Role === 1) {
      throw ApiError.BadRequest(`Вы не можете откликнуться на эту вакансию`);
    }

    const network = await prisma.socialNetwork.findFirst({
      where: {
        Id_user: id_user,
      },
    });
    if (!network.Specialization) {
      throw ApiError.BadRequest(`Вы не можете откликнуться на эту вакансию`);
    }

    const compId = await prisma.vacancys.findFirst({
      where: {
        Id: id_vacancy,
      },
    });

    const vacancy = await prisma.RespondVacancies.create({
      data: {
        Id_vacancies: id_vacancy,
        Id_user: id_user,
        Id_company: compId.Id_company,
        Mail: user.Mail,
        Phone: user.Phone,
        FirstName: user.FirstName,
        LastName: user.LastName,
        git_hub: network?.git_hub || "",
        linked_in: network?.linked_in || "",
        Specialization: network?.Specialization || "",
        Expirience: network?.Expirience || "",
      },
    });
    return vacancy;
  }

  async vacancySearch(searchTerm) {
    const vacancySearch = await prisma.vacancys.findMany({
      where: {
        Job_title: { contains: searchTerm },
      },
    });
    return vacancySearch;
  }

  async vacancyCompanyApply(idVacancy, Id_comp) {
    const vacancy = await prisma.respondVacancies.findMany({
      where: { Id_vacancies: idVacancy, Id_company: Id_comp },
    });
    return vacancy;
  }
}

module.exports = new VacancyService();
