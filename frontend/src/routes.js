import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profiles from "./pages/Profiles";
import Registration from "./pages/Registration";
import Vacancy from "./pages/Vacancy";
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  VACANCY_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profiles,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: VACANCY_ROUTE + "/:",
    Component: Vacancy,
  },
];
