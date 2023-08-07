const { google } = require('googleapis')
const User = require('../../models/user')

const sheets = google.sheets('v4')
const spreadsheetId = '1v7yvvOzaNvicwNEFf0oFXrJNo4BqdhLYv5qe48HTx84'
const range = 'Sheet1!C2:E'

async function getDataFromGoogleSheet(auth) {
  try {
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range
    })

    const newDataGathered = response.data.values
    const arrayOfObjects = newDataGathered.map(([name, mobile, email]) => {
      return { name, mobile, email }
    })

    return arrayOfObjects
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error.message)
    throw error
  }
}

function generateRandomPassword(passwordLength) {
  const passwordChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
  let password = ''
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length)
    password += passwordChars.charAt(randomIndex)
  }
  return password
}

async function generateUniqueUsername(name) {
  // Logic to generate a unique username based on the name
  // Replace this with your own logic to generate usernames from the name
  // For example, you can use a combination of name and random numbers
  const baseUsername = name.replace(/\s+/g, '').toLowerCase()
  let randomNumber = Math.floor(Math.random() * 1000000)
  let username = baseUsername
  while (await User.findOne({ username })) {
    username = baseUsername + randomNumber
  }
  return username
}

async function populateUserDataFromGoogleSheet(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    const dataFromSheet = await getDataFromGoogleSheet(auth)
    const passwordLength = 10
    const dataFromSheetWithPassword = []

    // Fetch all existing user emails from the database
    const existingUserEmails = new Set(
      (await User.find({}, { email: 1 })).map((user) => user.email)
    )

    for (const singleUser of dataFromSheet) {
      if (existingUserEmails.has(singleUser.email)) {
        console.log('User already exists, skipping:', singleUser)
      } else {
        const password = generateRandomPassword(passwordLength)
        const username = await generateUniqueUsername(singleUser.name)

        dataFromSheetWithPassword.push({
          ...singleUser,
          mobile: `+${singleUser.mobile}`,
          username,
          password,
          passwordConfirm: password
        })
      }
    }

    if (dataFromSheetWithPassword.length === 0) {
      return res.status(200).json({ message: 'No new users to insert.' })
    }

    const insertedData = await User.insertMany(dataFromSheetWithPassword)
    console.log('Batch Insert Successful:', insertedData)
    return res.status(200).json({ message: 'Uploaded', insertedData })
  } catch (error) {
    console.error('Error populating user data:', error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

module.exports = {
  populateUserDataFromGoogleSheet
}
