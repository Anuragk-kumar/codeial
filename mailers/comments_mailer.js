const nodeMailer = require('../config/nodemailer');


// this is another way to exporting a method

exports.newComment =async (comment) => {
    let htmlString =await nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'akloveme123@gmail.com',
        to:comment.user.email,
        subject: "New comment Published",
        html:htmlString

    },(err,info)=>{
        if(err){
        console.log('Error in sending mail',err);
        return;
        }
        // console.log('Message sent',info);
        return;
    });
}