const Router = require("express").Router;
const userControllers = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

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
router.post("/logout", userControllers.logout); /* Log out of your account */
router.get("/refresh", userControllers.refresh); /* Updating the token */
router.get(
  "/users",
  authMiddleware,
  userControllers.GetAllUsers
); /* Shows information about all users */
router.post(
  "/profiles",
  userControllers.getInfoUser
); /* We get information about the user in the profile */

module.exports = router;
