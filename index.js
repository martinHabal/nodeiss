const express = require('express')//import framework express
const ejs = require('ejs');//šablonovací knihovna
const mysql = require('mysql2');//NPM I MYSQL2//konektor na DB
const path = require('path');//pro manipulaci s cestami, ať už se jedná o absolutní cesty, relativní cesty
const bodyParser = require('body-parser');//import bodyParseru
const session = require('express-session');
const cookieParser = require("cookie-parser");


const app = express()//app běží na expressu
//const port = 3505//port, na kterém běží aplikace

const http = require('http').Server(app)//chat
const io = require('socket.io')(http);//import socket knihovny pro chat

//imort modulu
const routes = require('./routes/routes');
const users = require('./routes/user');
const timetable = require('./routes/timetable');
const statement = require('./routes/statement');
// Použití modulu s routami
app.use('/', routes);
app.use('/', users);
app.use('/', timetable);
app.use('/', statement);
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: 'sadhgsctgza', // Tajný klíč pro šifrování session dat
  resave: false, // Nerezervovat session, pokud není změněna
  saveUninitialized: true, // Uložit session i pro nepřihlášené uživatele
  cookie: { secure: false, maxAge: oneDay }, // Nastavení cookie (může být změněno podle potřeby), doba vypršení platnosti cookie. Zmizi z prohlizece SID
  resave: false//Umožňuje uložit relaci zpět do úložiště relací, i když relace nebyla během požadavku nikdy změněna. Souvislost s dva paralelní požadavky na server
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'images')));//umožní přístup k obrázkům
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'scripts')));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));//dekoduje data poslana pres POST

app.get('/set',function(req, res){
  req.session.user = { name:'Chetan' };
  res.send('Session set');
  });
  
  app.get('/get',function(req, res){
      if(req.session.user) {
  
          res.send(req.session.user);
      } else {
          res.send("musíš se přihlásit");
      }
  });

app.get('/newuser', (req, res) => {
  const data = {
    message: 'Index'
  };
  res.render('newuser', { data });

})

//routa na výmaz usera
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

app.get('/galery', (req, res) => {
  const imagePath = 'w.PNG'; // Cesta k obrázku
  res.render('galery', { imagePath });
});


app.get('/chat', (req, res) => {

  res.render('chat');
});

// Serve the Socket.io client script
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

io.on('connection', (socket) => {
  console.log('Nový uživatel připojen');
  console.log(socket.handshake.address)

  socket.on('chat message', (message) => {

    console.log('Přijata zpráva: ' + message);
    console.log(socket.handshake.address)
    let messageip = socket.handshake.address + "" + message
    io.emit('chat message', messageip);
  });

  socket.on('disconnect', () => {
    console.log('Uživatel odpojen');
  });
});

//NIKDY nazakomentovávat, toto spouští apku!!!!!!!!!!!!!!
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

//tak kvuli tomu chatu nahradim app za http
http.listen(3505, () => {
  console.log('Server is running on port 3000');
});