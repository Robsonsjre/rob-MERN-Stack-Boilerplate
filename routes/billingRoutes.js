const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    console.log("eae seus maluco");
    if (req.body.id) {
      const createObj = {
        amount: 500,
        currency: "usd",
        description: "5 dolars for 5 credits",
        source: req.body.id,
      }
      const charge = await stripe.charges.create(createObj);

      req.user.credits += charge.amount / 100;
      const user = await req.user.save();

      console.log(user)
      res.send(user)
    } else {
      //retornar um erro de falta de token
    }
  });
};
