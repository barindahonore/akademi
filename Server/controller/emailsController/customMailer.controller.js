const {customMailer}= require("../../service/customMailer.service")

const customMailerController = async (req, res)=>{
const { emailAddresses, subject, body } = req.body

try {
    const sendEmails = await customMailer(emailAddresses, subject, body)
    res.status(200).send({status: true, message:'successful', sendEmails})    
} catch (error) {
    res.status(500).send({status: false, message:'not successful', error})
    
}


}

module.exports={customMailerController}