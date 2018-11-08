const _ = require('lodash')
const { URL } = require('url')
const Path = require('path-parser').default
const mongoose = require('mongoose')

const Survey = mongoose.model('surveys')

function treatRoute(arrayOfObjRoutes) {

  const events = _.map(arrayOfObjRoutes, ({ url, email, event }) => {
    if (event !== 'click') return
    const pathname = new URL(url).pathname
    const p = new Path('/api/surveys/:surveyId/:choice')
    const matchs = p.test(pathname)
    if (matchs) {
      return { surveyId: matchs.surveyId, choice: matchs.choice, email }
    }
  })
  const compactEvents = _.compact(events)
  const uniqueEvents = _.uniqBy(compactEvents , 'email', 'surveyId');
  _.each(uniqueEvents, ({surveyId, email, choice}) => {
    Survey.updateOne({
        _id: surveyId,
        recipients: {
          $elemMatch: { email: email, clicked: false }
        }
    }, {
      $inc: { [choice]: 1 },
      $set: { 'recipients.$.clicked': true },
      lastResponded: new Date()
    }).exec()
  })
  return uniqueEvents
}

module.exports = treatRoute
// const treatEvents =
// _.chain(arrayOfObjRoutes)
// .map()
// .compact()
// .uniqBy('email', 'surveyId')
// .value()
