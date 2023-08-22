const express = require('express')
const auth = require('../middleware/auth')
const logsRouter = new express.Router()

const {getLoginAndLogoutLogs} = require('../controller/logsController/loginLogs')

logsRouter.get('/login-logs', getLoginAndLogoutLogs)

module.exports = logsRouter