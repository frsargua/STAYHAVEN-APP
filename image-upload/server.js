//importing dependencies
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

app.use(express.static('./image-upload'));

//middleware for bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//connection for the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Roflsticks081994_',
  dataabse: 'project2_db',
});

db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Successfully connected to MySQL');
});

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './image-upload/images/');
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

//route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/upload.html');
});

//route for post data
// eslint-disable-next-line
app.post('/post', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.log('No file upload');
  } else {
    console.log(req.file.filename);
    var imgsrc = 'http://localhost:3000/images/' + req.file.filename;
    var insertData = 'INSERT INTO users_file(file_src)VALUES(?)';
    // eslint-disable-next-line
    db.query(insertData, [imgsrc], (err, result) => {
      if (err) {
        throw err;
      }
      console.log('file uploaded');
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
