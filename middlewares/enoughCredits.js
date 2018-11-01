module.exports = (req, res, next) => {
  if (req.credits < 1) {
    res.status(401).send({error : "You should have enough credits"});
  }

  next();
};
