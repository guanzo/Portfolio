
/*

honeypot: if visibility is public and either email or subject is filled out, it's a bot

{
    visibility: 'public',
    name:'',
    email:'',
    subject:'',
    comment:'',
}

*/

var mailer = require("nodemailer");
var smtpTransport = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "guanzo91@gmail.com",
        pass: "eyg21777"
    }
});

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
            <p>Subject: ${data.subject}</p>
            <p>Comment: ${data.comment}</p>`
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){ console.log(error); return; }
        
        console.log("Message sent: " + response.message);
        smtpTransport.close();
    });
    
    
}
