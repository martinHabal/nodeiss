
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

    const tdElements = document.querySelectorAll("td");
    //naveseni eventhandleru na right click
    tdElements.forEach((td) => {

        td.addEventListener('contextmenu', function (ev) {
            console.log(ev.target)
            ev.preventDefault();
            dialog.style.display = "block"; // Zobrazíme dialog
            return false;
        }, false);
    })
    //zastaveni probublavani
    const selects = document.querySelectorAll('select');
    console.warn(selects)
    selects.forEach(select => {
        select.addEventListener("click", function (event) {
            // alert(55)
            event.stopPropagation(); // Zastaví další šíření události
            // Toto je event handler pro kliknutí na checkbox
        });
        //change handler
        select.addEventListener("change", function (event) {
            const selectedValue = select.value; // Získání vybrané hodnoty
            console.log('Vybráno: ' + selectedValue);
            //nastaveni bgcolor
            let color;
            switch (selectedValue) {
                case "overtime":
                    color = "red";
                    break;
                case "substit":
                    color = "yellow"
                    break;
                case "dropped":
                    color = "grey"
                    break;
                case "doctor":
                    color = "lightblue"
                    break;
                case "normal":
                    color = "transparent"
                    break;
                default:
                    color = "transparent"
            }
            event.target.parentElement.style.backgroundColor = color
            changeAttr(event.target.parentElement.getAttribute("id"), selectedValue)
            // console.log(event.target.parentElement.getAttribute("id"))
        });
    })



    //naveseni eventhandleru na hover

    tdElements.forEach((td) => {

        td.addEventListener('mouseover', function (ev) {
            // console.log(ev.target.children)
            ev.target.children[0].style.visibility = "visible"

            return false;
        }, false);

        td.addEventListener('mouseleave', function (ev) {
            ev.target.children[0].style.visibility = "hidden"

            return false;
        }, false);
    })


    // zmena predmetu
    function change() {
        console.log(event.target)

        let data = prompt("Zadejte předmět")
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
        }
    }

    // zmena atributu
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
            location.reload()
        }
    }


    //suma hodin
    //to si necham spocitat db priste
    //hmm, tak to nejdriv musim poresit na DB ty zmeny na polickach rozvrhu

}