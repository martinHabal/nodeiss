
window.onload = (event) => {

    // Získání aktuálního data
    const currentDate = new Date();

    // Získání roku, měsíce a dne
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Měsíce jsou indexovány od 0 (leden) do 11 (prosinec)
    const currentDay = currentDate.getDate();

    // Zobrazení aktuálního roku, měsíce a dne
    console.log(`Aktuální rok: ${currentYear}`);
    console.log(`Aktuální měsíc: ${currentMonth}`);
    console.log(`Aktuální den: ${currentDay}`);

    // Získání prvního dne měsíce následujícího měsíce
    const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    // Posun na poslední den aktuálního měsíce
    firstDayOfNextMonth.setDate(firstDayOfNextMonth.getDate() - 1);

    // Získání počtu dní v aktuálním měsíci
    const numberOfDaysInMonth = firstDayOfNextMonth.getDate();

    const tdElements = document.querySelectorAll(".data");
   
   
//eventhandler na zmenu predmetu
    tdElements.forEach((td) => {

        td.addEventListener('click', function (event) {
            change(event)

            return false;
        }, false);
    })

    tdElements.forEach((td) => {

        td.addEventListener('contextmenu', function (event) {

            console.log(event.target)
            event.preventDefault();
            let id = event.target.id
        
            let color = event.target.style.backgroundColor
    let state = "normal"
            console.log(color)
            console.log(event.target.textContent)
            if(color === "hotpink") {
                event.target.style.backgroundColor = "gold"
                // event.target.textContent = "Suplovaná"
                state = "substit"
            } else if(color === "gold") {
                event.target.style.backgroundColor = "lightgrey"
                // event.target.textContent = "Odpadnutá"
                state = "dropped"
            } else if(color === "lightgrey") {
                event.target.style.backgroundColor = "deepskyblue"
                // event.target.textContent = "Doktor"
                state = "doctor"
            } else if(color === "deepskyblue") {
                event.target.style.backgroundColor = "limegreen"
                // event.target.textContent = "Normální"
                state = "normal"
            } else if(color === "limegreen") {
                event.target.style.backgroundColor = "hotpink"
                // event.target.textContent = "Přesčasová"
                state = "overtime"
            }

            changeAttr(id, state)

            return false;


        }, true);
    })


    // zmena predmetu
    function change(event) {
        console.log(event.target.style)

        let data = prompt("Zadejte předmět", event.target.textContent.trim())
        if (data) {
            // URL API, kam bude odeslán požadavek
            const apiUrl = '/iteraceupdate';

            // Data, která budou odeslána jako součást požadavku (může být objekt nebo FormData)
            const requestData = {
                id: event.target.id,
                data: data
            };

            // Konfigurace pro POST požadavek
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Změňte na 'application/x-www-form-urlencoded', pokud odesíláte FormData
                },
                body: JSON.stringify(requestData) // Změňte na new URLSearchParams(requestData) pro 'application/x-www-form-urlencoded'
            };

            // Odeslání požadavku pomocí funkce fetch
            fetch(apiUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Chyba při komunikaci s API.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Úspěšně zpracována odpověď z API:', data);
                    // Zde můžete provést další zpracování dat z API
                })
                .catch(error => {
                    console.error('Chyba:', error);
                    // Zde můžete zpracovat chybu a poskytnout zpětnou vazbu uživateli
                });
            location.reload()
            return false;
        }
    }

    //nastaveni prvniho datumu
    function firstDateSet() {
       

        let data = prompt("Zadejte datum")
        if (data) {
            // URL API, kam bude odeslán požadavek
            const apiUrl = '/firstDaySet';

            // Data, která budou odeslána jako součást požadavku (může být objekt nebo FormData)
            const requestData = {
                id: 1,
                data: data
            };

            // Konfigurace pro POST požadavek
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Změňte na 'application/x-www-form-urlencoded', pokud odesíláte FormData
                },
                body: JSON.stringify(requestData) // Změňte na new URLSearchParams(requestData) pro 'application/x-www-form-urlencoded'
            };

            // Odeslání požadavku pomocí funkce fetch
            fetch(apiUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Chyba při komunikaci s API.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Úspěšně zpracována odpověď z API:', data);
                    // Zde můžete provést další zpracování dat z API
                })
                .catch(error => {
                    console.error('Chyba:', error);
                    // Zde můžete zpracovat chybu a poskytnout zpětnou vazbu uživateli
                });
            location.reload()
            return false;
        }
    }

    let firstDate = document.getElementById("firstDate")
    firstDate.addEventListener("click", () => firstDateSet())


    // zmena atributu - prescasova, opdadla...
    function changeAttr(id, state) {
        console.log("ev" + event.target)
        console.log(state)


        if (state) {
            // URL API, kam bude odeslán požadavek
            const apiUrl = '/atributupdate';

            //   let overtime;
            //   switch (state) {
            //     case "overtime":
            //         overtime = 1;
            //       break;
            //     case "substit":
            //         overtime = 0
            //       break;
            //     case "dropped":
            //         overtime = 0
            //       break;
            //     case "doctor":
            //         overtime = 0
            //       break;
            //       // Add more cases as needed
            //     default:
            //         overtime = 0
            //   }
            // Data, která budou odeslána jako součást požadavku (může být objekt nebo FormData)
            const requestData = {
                id: id,
                data: state
            };

            // Konfigurace pro POST požadavek
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Změňte na 'application/x-www-form-urlencoded', pokud odesíláte FormData
                },
                body: JSON.stringify(requestData) // Změňte na new URLSearchParams(requestData) pro 'application/x-www-form-urlencoded'
            };

            // Odeslání požadavku pomocí funkce fetch
            fetch(apiUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Chyba při komunikaci s API.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Úspěšně zpracována odpověď z API:', data);
                    // Zde můžete provést další zpracování dat z API
                })
                .catch(error => {
                    console.error('Chyba:', error);
                    // Zde můžete zpracovat chybu a poskytnout zpětnou vazbu uživateli
                });
            // location.reload()
        }
    }


    //suma hodin
    //to si necham spocitat db priste
    //hmm, tak to nejdriv musim poresit na DB ty zmeny na polickach rozvrhu

}