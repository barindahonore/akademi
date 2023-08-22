const LoginInfo = require('../../models/loginInfo');

async function getLoginAndLogoutLogs(req, res) {
  try {
    const allLogs = await LoginInfo.find();
    res.status(200).send({ size: allLogs.length, logs: allLogs });
  } catch (error) {
    console.error('Error fetching login and logout logs:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getLoginAndLogoutLogs
};
