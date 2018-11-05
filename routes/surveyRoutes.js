const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireLogin')
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys', requireLogin, requireCredits,  async (req, res) => {
    console.log('req.body')
    console.log(req.body)
    const { title, subject, body, recipients } = req.body

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      userId: req.user.id,
      dateSend: Date.now()
    })

    //send email here
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey))
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }

  })
};
