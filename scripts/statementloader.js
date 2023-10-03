//loader hodin do výkazu z rozvrhu
//id načítacího tlačítka
export class StatementLoader {
    constructor(id) {
        this.id = id
        this.loadBtn = document.getElementById(id)
        this.test = 123
    }
    // addEvent() {
    //     loadBtn.addEventListener('click', () => {
    //         loadStatement()
    //     })
    // }
    // load() {//nahrání rozvrhu do výkazu

    //     const yes = confirm("Opravdu chcete načíst data z rozvrhu? Aktuální data se přepíší.")//tady vlastne jen poslu get na routu kde se to vynda z rovrhu a prepise na vykaz

    //     if (yes) {

    //         const apiUrl = '/loadStatement';

    //         const requestData = {
    //             id: event.target.id
    //         };

    //         // Konfigurace pro POST požadavek
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json' // Změňte na 'application/x-www-form-urlencoded', pokud odesíláte FormData
    //             },
    //             body: JSON.stringify(requestData) // Změňte na new URLSearchParams(requestData) pro 'application/x-www-form-urlencoded'
    //         };

    //         fetch(apiUrl, requestOptions)
    //             .catch(error => {
    //                 console.error('Chyba:', error);
    //             });
    //         location.reload()

    //     }
    // }
}

