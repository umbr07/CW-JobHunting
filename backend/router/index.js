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
);
router.post("/login", userControllers.login);
router.post("/logout", userControllers.logout);
router.get("/refresh", userControllers.refresh);
router.get("/users", authMiddleware, userControllers.GetAllUsers);

module.exports = router;
