const express = require('express')//import framework express
const ejs = require('ejs');//šablonovací knihovna
const mysql = require('mysql2');//NPM I MYSQL2//konektor na DB
const path = require('path');//pro manipulaci s cestami, ať už se jedná o absolutní cesty, relativní cesty
const bodyParser = require('body-parser');//imort bodyParseru

const app = express()//app běží na expressu
const port = 80//port, na kterém běží aplikace


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'images')));//umožní přístup k obrázkům
app.use(express.static(path.join(__dirname, 'css')));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));//dekoduje data poslana pres POST


const connection = mysql.createConnection({
  host: 'localhost', // Název nebo IP adresa serveru databáze
  user: 'monty', // Uživatelské jméno
  password: 'monty88', // Heslo
  database: 'new_schema', // Název databáze
  port: 3001
});


app.get('/newuser', (req, res) => {
  const data = {
    message: 'Index'
  };
  res.render('newuser', { data });

})

app.post('/newuser', function (request, response, next) {

  // SQL dotaz pro vložení dat do databáze
  var sql = `INSERT INTO users (fname, lname) VALUES ('${request.body.fname}', '${request.body.lname}')`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  })
  response.send(`Uživatele byli vloženi do DB`)

})


app.get('/', (req, res) => {
  const data = {
    message: 'Rozcestník'
  };
  res.render('index', { data });
})

//routa na vypis vsech useru
app.get('/users', (req, res) => {

  //dotaz na SQL
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)
    res.render('users', { results });

  })
})

//routa na výmyz usera
app.post('/deleteuser', (req, res) => {
  console.log(`Body je ${req.body.id}`)
  let sql = `DELETE FROM users WHERE idusers=${req.body.id}`;
  //dotaz na SQL
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)
    console.log("Uživatel byl smazán")

    res.render('users', { results });

  })
})

app.post('/deleteallusers', (req, res) => {
  
  let sql = `DELETE FROM users`;
  //dotaz na SQL
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)
    console.log("Všichni uživatelé byli smazáni")

    res.render('users', { results });

  })
})


app.get('/galery', (req, res) => {
  const imagePath = 'w.PNG'; // Cesta k obrázku
  res.render('galery', { imagePath });
});

//NIKDY nazakomentovávat, toto spouští apku!!!!!!!!!!!!!!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})