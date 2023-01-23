const router = require("express").Router();
const db = require("../../models");
const passport = require("../../passport");

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req);
  res.json(req.user);
});

router.post("/signup", (req, res) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbResponse) => {
      res.json(dbResponse);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("user/google", function (req, res, next) {
  // GET /user/google
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

router.get(
  "user/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  async (req, res, next) => {
    return res.status(200).redirect(frontUrl);
  }
);

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.json("logout successful");
});

// Route for getting some data about our user to be used client side
router.get("/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;
