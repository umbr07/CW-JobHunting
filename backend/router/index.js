const Router = require("express").Router;
const userControllers = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const vacancyController = require("../controllers/vacancy-controller");

const router = new Router();

router.post(
  "/registration",
  body("Mail").isEmail(),
  body("Password").isLength({ min: 3, max: 32 }),
  userControllers.registration
); /* Account registration */
router.post(
  "/company",
  body("Mail").isEmail(),
  body("Password").isLength({ min: 3, max: 32 }),
  userControllers.regCompany
); /* Company account registration */
router.post("/login", userControllers.login); /* Log in to your account */
router.get("/auth", authMiddleware, userControllers.check);
router.post("/logout", userControllers.logout); /* Log out of your account */
router.get("/refresh", userControllers.refresh); /* Updating the token */
router.get(
  "/users",
  //authMiddleware,
  userControllers.GetAllUsers
); /* Shows information about all users */
router.get("/vacancy", userControllers.GetAllVacancy); /* Shows all vacancy */
router.post(
  "/profiles",
  userControllers.getInfoUser
); /* We get information about the user in the profile */
router.post(
  "/vacancys",
  vacancyController.createVacancy
); /* Create a new vacancy */
router.post(
  "/deletvacancy",
  vacancyController.DeleteVacancy
); /* Delete vacancy */
router.post(
  "/deletvacancycomp/:id",
  vacancyController.DeleteVacancyCompany
); /* Delete vacancy company */
router.post("/deletusers", userControllers.DeleteUsers); /* Delete user */
router.post("/editprofile", userControllers.EditUsers); /* edit profile */
router.post(
  "/editprofilenetwork",
  userControllers.EditUsersNetwork
); /* edit profile */
router.get(
  "/usersinfo/:id",
  userControllers.GetInfoUser
); /* user info in profiles */
router.get(
  "/usersinfonetwork/:id",
  userControllers.GetInfoUserNetwork
); /* user network info in profiles */

router.get(
  "/vacancyinfo/:id",
  vacancyController.GetAllVacancyCompany
); /* Shows all vacancies of a certain company  */
router.post("/vacancyapply", vacancyController.ApplyVacancyUser);
router.post("/vacancysearch", vacancyController.VacancySearch);

module.exports = router;
