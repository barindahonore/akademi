const User = require('../models/user');

const adminUser = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  passwordConfirm: process.env.ADMIN_PASSWORD,
  username: 'admin',
  name: "system admin",
  role: "admin",
  mobile: "+250787885197"
};

const createAdminUser = async () => {
  try {
    // Check if the admin user already exists
    console.log(adminUser.email)
    const existingUser = await User.findOne({ email: adminUser.email });

    if (existingUser) {
      throw new Error('Admin user already exists!');
    }

    const newUser = new User(adminUser);
    newUser.code = Date.now();
    await newUser.save();
    console.log(newUser);

    // Return success response
    return { email: newUser.email, username: newUser.username };
  } catch (e) {
    // Handle duplicate key errors
    if (e.code === 11000) {
      if (e.keyPattern && e.keyPattern.username === 1) {
        throw new Error('This username is already taken!');
      }
      if (e.keyPattern && e.keyPattern.email === 1) {
        throw new Error('This email is already registered!');
      }
    }
    // Handle other errors
    throw new Error(e);
  }
};

module.exports = {
  createAdminUser
};






































// const User = require('../../models/user')

// const adminUser = {
//     email: process.env.ADMIN_EMAIL,
//     password: process.env.ADMIN_PASSWORD,
//     username: 'admin',
//     name:"system admin",
//     role: "admin",
//     mobile: "+250787885197"
// };
  
// const createAdminUser = async () => {
//     try {
//       const user = new User(adminUser)

//       user.code = Date.now()
//       const newUser = await user.save()
//       console.log(newUser)
  
//       return res.status(201).send({ Message: `new user was created`, user: {email: newUser.email, username: newUser.username} })
//     } catch (e) {
//       if (e.code === 11000 && e.keyPattern && e.keyPattern.username === 1) {
//         // Duplicate key error, meaning the username is already taken
//         return res.status(400).json({ customError: 'This username is already taken!' });
//       }
//       if (e.code === 11000 && e.keyPattern && e.keyPattern.email === 1) {
//         // Duplicate key error, meaning the username is already taken
//         return res.status(400).json({ customError: 'This emai is already registered' });
//       }
//       res.status(400).send({message: "something went worng", error: e})
//     }
//   }

//   module.exports= {
//     createAdminUser
//   }