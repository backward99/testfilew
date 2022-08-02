const { User} = require('../models/User');

let auth = (req, res, next) => {

    //인증을 처리하는 곳

    //쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;


    //토큰 복호화 후 유저를 찾는다.
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        //유저가 없으면 인증 안해줌
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })
    

}


module.exports = {auth};