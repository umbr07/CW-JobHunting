import { $authHost, $host } from "./index";

export const registration = async (
  Mail,
  Password,
  FirstName,
  LastName,
  Phone,
  NameCompany,
  Location
) => {
  const response = await $host.post("api/registration", {
    Mail,
    Password,
    FirstName,
    LastName,
    Phone,
  });
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
  return response;
};

export const login = async (Mail, Password) => {
  const response = await $host.post("api/login", {
    Mail,
    Password,
  });
  localStorage.setItem("token", response);
  console.log(localStorage);
  return response;
};
