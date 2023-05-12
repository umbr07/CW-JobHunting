import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  Mail,
  Password,
  FirstName,
  LastName,
  Phone
) => {
  const response = await $host.post("api/registration", {
    Mail,
    Password,
    FirstName,
    LastName,
    Phone,
  });
  localStorage.setItem("token", response);
  console.log(localStorage);
  return response;
};

export const regCompany = async (
  Mail,
  Password,
  FirstName,
  LastName,
  Phone,
  NameCompany,
  Location
) => {
  const response = await $host.post("api/company", {
    Mail,
    Password,
    FirstName,
    LastName,
    Phone,
    NameCompany,
    Location,
  });
  localStorage.setItem("token", response);
  console.log(localStorage);
  return response;
};

export const login = async (Mail, Password) => {
  const { data } = await $host.post("api/login", {
    Mail,
    Password,
  });
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.Role);
  console.log(localStorage);
  return jwt_decode(data.token);
};

export const check = async () => {
  const response = await $authHost.get("api/auth");
  localStorage.setItem("token", response.data.token);
  console.log(localStorage);
  return response;
};

export const AddVacancy = async (CompanyId, Title, Desc, Salary, Location) => {
  const CompId = parseInt(CompanyId);
  const { data } = await $host.post("api/vacancys", {
    CompId,
    Title,
    Desc,
    Salary,
    Location,
  });
  console.log(data);
};

export const AddVacancyCompany = async (Title, Desc, Salary, Location) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const CompId = parseInt(decodedToken.id);

  const { data } = await $host.post("api/vacancys", {
    CompId,
    Title,
    Desc,
    Salary,
    Location,
  });
  console.log(data);
};

export const DeletUser = async (userIdDelete) => {
  const Id = parseInt(userIdDelete);
  const { data } = await $host.post("api/deletusers", {
    Id,
  });
  console.log(data);
};

export const DeletVacancy = async (vacancyIdDelete) => {
  const Id = parseInt(vacancyIdDelete);
  const { data } = await $host.post("api/deletvacancy", {
    Id,
  });
  console.log(data);
};

export const EditUser = async (Fname, Lname, Phone) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const Id = parseInt(decodedToken.id);
  const { data } = await $host.post("api/editprofile", {
    Id,
    Fname,
    Lname,
    Phone,
  });
  console.log(data);
};

export const EditNetworkUser = async (git_hub, linked_in) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = parseInt(decodedToken.id);
  const { data } = await $host.post("api/editprofilenetwork", {
    userId,
    git_hub,
    linked_in,
  });
  console.log(data);
};
