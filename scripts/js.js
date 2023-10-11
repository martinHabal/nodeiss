// import { statementloader } from 'statementloader';
// const StatementLoader = require('StatementLoader.js');
// import name from 'test.js';


function signIn() {
    const url = '/signin'; // Nahraďte tímto URL adresu, na kterou chcete poslat POST požadavek
    let login = prompt("Zadejte login")
    const data = {
        login: login,
        // další data, která chcete odeslat
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specifikujeme typ obsahu jako JSON
            // další hlavičky, pokud jsou potřeba
        },
        body: JSON.stringify(data), // Převedeme objekt na JSON řetězec
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Chyba při odesílání požadavku');
            }
            return response.json(); // Přečteme odpověd jako JSON
        })
        .then(data => {
            console.log('Úspěšně odesláno:', data);
        })
        .catch(error => {
            console.error('Chyba:', error);
        });
}
//načte rozvrh
function loadTimetable() {
    fetch('/timetable')
        .then(response => response.text())
        .then(data => {
            // Zobrazíme obsah v divu "content"
            document.getElementById('content').innerHTML = data;
        }).then(() => {
            // eventhandler na zmenu predmetu
            const tds = document.querySelectorAll(".data");
            tds.forEach((td) => {

                td.addEventListener('click', function (event) {
                    changeTimetableData(event)

                    return false;
                }, false);
            })
        });

}
loadTimetable()
//načte výkaz
function loadStatement() {
    fetch('/statement')
        .then(response => response.text())
        .then(data => {
            // Zobrazíme obsah v divu "content"
            document.getElementById('content').innerHTML = data;

            const loadBtn = document.getElementById('load')
            const loadBtn2 = document.getElementById('load2')
            console.log(loadBtn)

            loadBtn.addEventListener('click', () => {
                loadStatement()
            })
            loadBtn2.addEventListener('click', () => {
                loadStatement2()
            })

            let firstDate = document.getElementById("firstDate")
            firstDate.addEventListener("click", () => firstDateSet())

        }).then(() => {
            //eventhandler na zmenu predmetu
            const tds = document.querySelectorAll(".data");
            // console.log(tds)
            tds.forEach((td) => {

                td.addEventListener('click', function (event) {
                    change(event)

                    return false;
                }, false);

                td.addEventListener('contextmenu', function (event) {

                    console.log(event.target)
                    event.preventDefault();
                    let id = event.target.id

                    let color = event.target.style.backgroundColor
                    let state = "normal"
                    console.log(color)
                    console.log(event.target.textContent)
                    if (color === "hotpink") {
                        event.target.style.backgroundColor = "gold"
                        // event.target.textContent = "Suplovaná"
                        state = "substit"
                    } else if (color === "gold") {
                        event.target.style.backgroundColor = "lightgrey"
                        // event.target.textContent = "Odpadnutá"
                        state = "dropped"
                    } else if (color === "lightgrey") {
                        event.target.style.backgroundColor = "deepskyblue"
                        // event.target.textContent = "Doktor"
                        state = "doctor"
                    } else if (color === "deepskyblue") {
                        event.target.style.backgroundColor = "limegreen"
                        // event.target.textContent = "Normální"
                        state = "normal"
                    } else if (color === "limegreen") {
                        event.target.style.backgroundColor = "transparent"
                        // event.target.textContent = "Přesčasová"
                        state = "empty"
                    } else if (color === "transparent") {
                        event.target.style.backgroundColor = "hotpink"
                        // event.target.textContent = "Přesčasová"
                        state = "overtime"
                        // alert(event.target.style.backgroundColor)
                    }

                    changeAttr(id, state)

                    return false;

                }, true);
            })


        });
}
window.onload = (event) => {
    
    //přihlášení uživatele
    document.getElementById('login').addEventListener('click', () => {
        let user = prompt("Zadejte uživatelské jméno")
        document.cookie = `user=${user}`;

        location.reload()
    });
    //odhlášení uživatele
    document.getElementById('logout').addEventListener('click', () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.reload()
    });

   

    function duplicate() {//funkce na duplikovani sudy a lichy aby se to nemuselo psat dvakrat

    }
    //suma hodin
    //to si necham spocitat db priste
    //hmm, tak to nejdriv musim poresit na DB ty zmeny na polickach rozvrhu

}