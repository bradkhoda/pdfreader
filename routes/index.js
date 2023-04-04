var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('pdf'), (req, res) => {
  // read the uploaded file
  const file = req.file;
  const filePath = file.path;

  const databuffer = fs.readFileSync(filePath);
  pdfParse(databuffer).then(function(data, err) {
    if(err) {
        console.log("error occured");
        res.errored(err);
    }
    else {
        res.send(data.text);
    }
  });

});

module.exports = router;
