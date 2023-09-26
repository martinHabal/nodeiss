
window.onload = (event) => {

    // zmena predmetu
    function changeTimetableData(event) {
        console.log(event.target.style)

        let data = prompt("Zadejte předmět", event.target.textContent.trim())
        if (data) {
            // URL API, kam bude odeslán požadavek
            const apiUrl = '/timetableupdate';

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

const tdElements = document.querySelectorAll(".data");

//eventhandler na zmenu predmetu
tdElements.forEach((td) => {

    td.addEventListener('click', function (event) {
        changeTimetableData(event)

        return false;
    }, false);
})

}