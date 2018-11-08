const mongoose = require('mongoose')
const { Schema } = mongoose
const recipientSchema = require('./Recipient')

const surveysSchema = new Schema({
  title: { type: String, default: 'SurveyName' },
  subject: { type: String, default: 'Survey Email' },
  body: { type: String, default: 'Survey Email Testing Body' },
  recipients: [recipientSchema],
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  dateSend: Date,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  lastResponded: Date
})

mongoose.model('surveys', surveysSchema)
