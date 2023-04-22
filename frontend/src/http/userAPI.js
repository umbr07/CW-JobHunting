import { $authHost, $host } from "./index";

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
  return response;
};

export const login = async (Mail, Password) => {
  const response = await $host.post("api/login", {
    Mail,
    Password,
  });
  return response;
};
