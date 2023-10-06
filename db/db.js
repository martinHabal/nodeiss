const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // Název nebo IP adresa serveru databáze
    user: 'mh', // Uživatelské jméno
    password: 'befelemepeseveze44', // Heslo
    database: 'timetable', // Název databáze
    port: 3001
  });

  // Připojení k databázi
  connection.connect((err) => {
    if (err) {
      console.error('Chyba při připojení k databázi: ' + err.message);
    } else {
      console.log('Připojení k databázi bylo úspěšné.');
    }
  });
  
  module.exports = connection;