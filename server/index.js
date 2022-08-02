const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser'); 
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const config = require('./config/key')
const cookieParser = require('cookie-parser');
const router = express.Router();
const multer = require("multer");
const cors = require('cors');


app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/json', require('./Json'));

app.use('/uploads', express.static('uploads'));

const mongoose = require('mongoose');
const res = require('express/lib/response');
mongoose.connect(config.mongoURI , {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('mongoDB connect'))
.catch(err=>console.log(err))



// if(process.env.NODE_ENV === "production") {
//     // app.use(cors());
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) =>{
//         res.sendFile(path.resolve(__dirname, "../client","build","index.html"));
//     });
// }


 

app.get('/', (req,res)=> res.send('Hello World 그럼 여기서만 바꾸면 된다는거지? 이거는 live그거랑은 연동이 안되네'))


// app.get('/api/hello', (req, res)=>{res.send("안녕하세요 ~")})
//post형식으로 회원가입? 
app.post('/api/users/register', (req,res)=>{
    const user = new User(req.body)

    user.save((err, userInfo) =>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req,res)=>{
    //아이디 비교하는 함수 - 두개 값을 반환하는듯? err, user/ user에 이메일과 일치한 user정보 가져오는듯
    User.findOne({email: req.body.email}, (err, user) => {
        //찾는 이메일이 존재하지 않을 때 
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "이메일과 일치하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch)=>{
            //비밀번호가 일치하지 않으면
            if(!isMatch)
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});
            //비밀번호 할때
            user.generateToken((err, user) => {
                //에러뜨면 
                if(err) return res.status(400).send(err);
                //쿠키에 x_auth이름으로 user.token값 저장
                res.cookie("x_auth", user.token)
                .status(200)//정상처리
                .json({ loginSuccess: true, userId: user._id })//json형식으로 알려줌
            })
        })
    })
})

app.get('/api/users/auth', auth ,(req,res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

app.get('/api/users/logout', auth, (req,res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""},
        (err, user)=>{
            if(err) return res.json({ success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})


app.use(cors());

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "../client/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
  }

  
// app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))
app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });