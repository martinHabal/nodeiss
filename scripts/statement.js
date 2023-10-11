// window.onload = (event) => {
// alert(5)



//nahrání rozvrhu do výkazu
function loadStatement() {
    // Data, která budou odeslána jako součást požadavku (může být objekt nebo FormData)

    const yes = confirm("Opravdu chcete načíst data z rozvrhu? Aktuální data se přepíší.")//tady vlastne jen poslu get na routu kde se to vynda z rovrhu a prepise na vykaz
    alert(yes)
    if (yes) {

        const apiUrl = '/loadStatement';

        const requestData = {
            id: event.target.id
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

            .catch(error => {
                console.error('Chyba:', error);
                // Zde můžete zpracovat chybu a poskytnout zpětnou vazbu uživateli
            });
        location.reload()
    }
}

function loadStatement2() {
    // Data, která budou odeslána jako součást požadavku (může být objekt nebo FormData)

    const yes = confirm("Opravdu chcete načíst data z rozvrhu? Aktuální data se přepíší.")//tady vlastne jen poslu get na routu kde se to vynda z rovrhu a prepise na vykaz
    alert(yes)
    if (yes) {

        const apiUrl = '/loadStatement2';

        const requestData = {
            id: event.target.id
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

            .catch(error => {
                console.error('Chyba:', error);
                // Zde můžete zpracovat chybu a poskytnout zpětnou vazbu uživateli
            });
        location.reload()
    }
}

// let firstDate = document.getElementById("firstDate")
// firstDate.addEventListener("click", () => firstDateSet())

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


// zmena predmetu ve vykazu
function change(event) {
    console.log(event.target.style)

    let data = prompt("Zadejte předmět", event.target.textContent.trim())
    if (data) {
        // URL API, kam bude odeslán požadavek
        const apiUrl = '/statementupdate';

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


// zmena atributu ve vykazu - prescasova, opdadla...
function changeAttr(id, state) {
    console.log("ev" + event.target)
    console.log(state)


    if (state) {
        // URL API, kam bude odeslán požadavek
        const apiUrl = '/atributupdate';

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
// }