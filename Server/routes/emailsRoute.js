const {customMailerController} = require('../controller/emailsController/customMailer.controller')
const express = require('express') ; 
const auth = require('../middleware/auth')

const emailRouter = new express.Router()

emailRouter.post('/send-emails', customMailerController)

module.exports = emailRouter