const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


//데이터베이스 형식같은거임
const userSchema = mongoose.Schema({
        name: {
            type: String,
            maxlength: 50
        },
        email: {
            type: String,
            trim: true,
            unique: 1  
        },
        password: {
            type: String,
            minlength: 5
        },
        lastname: {
            type: String,
            maxlength: 50    
        },
        role: {
            type: Number,
            default: 0    
        },
        image: String,
        token: {
            type: String
        },
        tokenExp: {
            type: Number
        }
})

//save를 실행하기 전에 실행되는 함수 : .pre
userSchema.pre('save', function(next){
    //이때 this는 자신을 부른 곳을 가르킴
    var user = this;
    //패스워드를 변경할 경우
    if(user.isModified('password')){
        //bcrypt는 암호화하는거인듯
        //.genSalt는 Salt를 얻음
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            //user.password를 hash값으로 바꿈
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        //next()를 해주지 않으면 다음으로 넘어가지 않고 머물러있음
        next()
    }
})




//패스워드 비교함수
userSchema.methods.comparePassword = function(plainPassword, cb){
    //일력 받은 패스워드를 복호화 시켜서 비교하는 함수
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        //맞다면 리콜
        cb(null, isMatch)
    })
}


//토큰 생성 함수
userSchema.methods.generateToken  = function(cb) {
    var user = this;

    //두번째 인자를 사용하여 id를 토큰화
    var token = jwt.sign(user._id.toHexString(), 'rand')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function ( token, cb){
    var user = this;

    // user._id + '' = token

    jwt.verify(token, 'rand', function(err, decoded){
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }