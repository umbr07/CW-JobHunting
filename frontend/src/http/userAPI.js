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
  localStorage.setItem("token", response);
  console.log(localStorage);
  return response;
};
