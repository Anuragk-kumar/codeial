const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// const accessLogStream = rfs('access.log',{
//     interval : 'id',
//     path : logDirectory,
// });
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const development ={
    name: 'development',
    asset_path:'./public/assets',
    session_cookie_key:'blahsomething',
    db:'codial_development',
    smtp: {
        service: 'gmail',
        host: 'smpt.gmail.com',
        port: 587,
        secure:false,
        auth:{
            user:'akloveme123@gmail.com',
            pass:'layxbofrgujvfalp'
        }
    },
    google_client_id: "389152076646-qpnuf4thjhi3bufopnm886qb7t0hnqs4.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogStream}
    }
}
const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSETS_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smpt.gmail.com',
        port: 587,
        secure:false,
        auth:{
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.CODEIAl_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_UR,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogStream}
    }
}






module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development: eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = development;