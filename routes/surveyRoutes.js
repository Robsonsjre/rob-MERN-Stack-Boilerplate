const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireLogin')
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const treatRoute = require('../utils/surveys')
module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    try {
      const surveys = await Survey.find({
        userId: req.user.id
      }).select({ recipients: false })
      res.send(surveys)
    } catch(err) {
      res.status(400).send(err)
    }

  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log('bateu webhook')
    console.log(req.body)
    const a = treatRoute(req.body)
    console.log('a', a)
    res.send('opa')
  })

  app.post('/api/surveys', requireLogin, requireCredits,  async (req, res) => {
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
