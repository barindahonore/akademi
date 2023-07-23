// import nodemailer from 'nodemailer'; 
// import Transport from "nodemailer-sendinblue-transport";
// import footer from '../templates/footer';

const nodemailer = require('nodemailer');
const Transport = require("nodemailer-sendinblue-transport");
const footer = require('../templates/footer');

const emailService = (sendTo, subject, htmlTemp) => {
	const transporter = nodemailer.createTransport(
		new Transport({ apiKey: process.env.SENDINBLUE_API_KEY })
	);

	const options = {
		// from: process.env.SEND_FROM,
		from: `"Akademi Team" <${process.env.SEND_FROM}>`,
		to: sendTo,
		subject: subject,
		html: `${htmlTemp} <br/> <br/>${footer}`,
	};

	transporter.sendMail(options, function (err, info) {
		if (err) {
			console.log(err);
			return err;
		}
		console.log(info);
		return info.response;
	});
};

module.exports = emailService;