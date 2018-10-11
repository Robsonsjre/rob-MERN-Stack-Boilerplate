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

  app.get("/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect('/surveys')
  }
);

  app.get("/api/teste", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    console.log('ooopa')
    req.logout();
    res.redirect('/');
  });
}
