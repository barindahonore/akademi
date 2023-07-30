const {createAdminUser} = require('./config/adminCreator')

let postStart= async ()=>{
   await createAdminUser()
}
postStart()