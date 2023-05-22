import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profiles from "./pages/Profiles";
import Registration from "./pages/Registration";
import CompanyReg from "./pages/CompanyReg";
import Vacancy from "./pages/Vacancy";
import Support from "./pages/Support";
import CompanyPanel from "./pages/CompanyPanel";
import History from "./pages/History";
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  REGISTRATION_COMPANY_ROUTE,
  VACANCY_ROUTE,
  SUPPORT_ROUTE,
  COMPANYPANEL_ROUTE,
  HISTORY_APPLY_VACANCY,
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
  {
    path: COMPANYPANEL_ROUTE,
    Component: CompanyPanel,
  },
  {
    path: HISTORY_APPLY_VACANCY,
    Component: History,
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
    path: VACANCY_ROUTE,
    Component: Vacancy,
  },
  {
    path: REGISTRATION_COMPANY_ROUTE,
    Component: CompanyReg,
  },
  {
    path: SUPPORT_ROUTE,
    Component: Support,
  },
];
