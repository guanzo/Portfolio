require('dotenv').config()

var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var fs = require('fs');

var smtpTransport = mailer.createTransport(smtpTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
}));

module.exports = {
    processComment (req, res) {
        var data = req.body.data;
        emailMe(data)

        res.sendStatus(200)
    },
}

function emailMe(data){
    var mail = {
        from: "Portfolio",
        to: "guanzo91@gmail.com",
        subject: "Comment posted in portfolio",
        html: `
            <p>Name: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <p>Subject: ${data.subject}</p>
            <p>Comment: ${data.comment}</p>`
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){ console.log(error); return; }
        
        console.log("Message sent!");
        smtpTransport.close();
    });
    
    
}
