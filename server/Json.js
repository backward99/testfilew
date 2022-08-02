const express = require('express')
const router = express.Router();
const multer = require("multer");
const {Json} = require('./models/Json');
var ffmpeg = require("fluent-ffmpeg");



let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    // fileFilter:  (req, file, cb) => {
    //     const ext = path.extname(file.originalname);
    //     if(ext !== '.json'){
    //         return cb(res.status(400).end('only json is allowd'), false);
    //     }
    //     cb(null, true);
    // },
});


const upload = multer({storage: storage}).single("file");

router.post('/uploadfiles', (req, res) =>{
    upload(req, res, err => {
        if(err) {
            console.log('err',err)
            return res.json({ uploadSuccess: false, err})
        }
        return res.json({ uploadSuccess: true, url: res.req.file.path, fileName: res.req.file.filename, jsonText : res.req.data, realName : res.req.file.originalname})
    })
})


router.post('/uploadJson', (req, res) =>{
    const json = new Json(req.body);

    json.save((err,doc)=>{
        if(err) return res.json({uploadJsonSuccess: false, err});

        res.status(200).json({uploadJsonSuccess: true})

    })

})

// router.get('/getJsons', (req, res) =>{
//     Json.find()
//         .populate('writer')
//         .exec((err,jsons)=>{
//             if(err) return res.status(400).send(err);
//             res.status(200).json({success : true, jsons})
//         })
// })


router.post('/getUserJsons', (req, res) =>{
    Json.find({ writer : req.body._id })
        .populate('writer')
        .exec((err,jsons)=>{
            if(err) return res.status(400).send(err);


            res.status(200).json({success : true, jsons})
        })
})




module.exports = router;