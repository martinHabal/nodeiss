// routes.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');//NPM I MYSQL2//konektor na DB
const cookieParser = require('cookie-parser');
const session = require('express-session');

router.use(session({
  secret: 'sadhgsctgza', // Tajný klíč pro šifrování session dat
  resave: false, // Nerezervovat session, pokud není změněna
  saveUninitialized: true, // Uložit session i pro nepřihlášené uživatele
  cookie: { secure: false } // Nastavení cookie (může být změněno podle potřeby)
}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

const connection = mysql.createConnection({
  host: 'localhost', // Název nebo IP adresa serveru databáze
  user: 'mh', // Uživatelské jméno
  password: 'befelemepeseveze44', // Heslo
  database: 'timetable', // Název databáze
  port: 3001
});




//update rozvrhu
router.post('/firstDaySet', function (request, response, next) {


  console.log(request.body.id)
  console.log(request.body.data)

  // Aktualizace záznamu v tabulce
  const idToUpdate = 'day'; // ID záznamu, který chcete aktualizovat
  const newValues = {
    first_day: request.body.data
  };
  // SQL dotaz pro vložení dat do databáze
  const sqlQuery = 'UPDATE main SET ? WHERE id = ?';

  connection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
    if (err) {
      console.error('Chyba při aktualizaci záznamu: ' + err.stack);
      return;
    }
    console.log('Záznam byl úspěšně aktualizován.');
  });


  // response.render('newtimetable', { data });
  // response.send("hotovo")

})


router.get('/', (req, res) => {
  console.log("session je "+ req.session.login)//tu promennou to vidi kdyz tam prejdu z po odeslani loginu, ale pokud hned tak je to prazdny
  res.render('login'); // -> onclick na /login post v users
  // res.redirect('index')
})

router.get('/index', (req, res) => {
  console.log("session je "+ req.session.login)//tu promennou to vidi kdyz tam prejdu z po odeslani loginu
  res.render('index');
})






// });
module.exports = router;
