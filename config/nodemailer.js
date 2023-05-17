const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

/* This code is creating a nodemailer transporter object that will be used to send emails using the
Gmail service. The transporter object is configured with the Gmail SMTP server settings, including
the host, port, and authentication credentials (email and password). The `secure` option is set to
`false` to indicate that the connection to the SMTP server should not use SSL/TLS encryption. */
let transporter = nodemailer.createTransport(env.smtp);



let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('Error in rendering template',err); return}
            mailHTML = template;
        }
    )
    return mailHTML;
} 


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}