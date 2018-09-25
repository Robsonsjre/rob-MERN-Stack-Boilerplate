const passport = require("passport");

module.exports = app => {

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );


    // app.get(
    //   "/auth/facebook",
    //   passport.authenticate("facebook", {
    //     scope: ["user_friends", "email"]
    //   })
    // );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/", (req, res) => {
    console.log(req);
    res.send({ hi: "thereeee" });
  });

  app.get("/teste", (req, res) => {
    res.send(req.user);
  });

  app.get("/logout", (req, res) => {
    req.logout();
  });
}
