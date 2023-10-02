
window.onload = (event) => {


    document.getElementById('rozvrh').addEventListener('click', () => {
        // Použijeme Fetch API k načtení obsahu z jiné routy
        fetch('/timetable')
            .then(response => response.text())
            .then(data => {
                // Zobrazíme obsah v divu "content"
                document.getElementById('content').innerHTML = data;
            }).then(()=> {
                const tds = document.querySelectorAll(".data");
                tds.forEach((td) => {

                    td.addEventListener('click', function (event) {
                        changeTimetableData(event)
                
                        return false;
                    }, false);
                })
            });
    });

    document.getElementById('vykaz').addEventListener('click', () => {
        // Použijeme Fetch API k načtení obsahu z jiné routy
        fetch('/statement')
            .then(response => response.text())
            .then(data => {
                // Zobrazíme obsah v divu "content"
                document.getElementById('content').innerHTML = data;
            });
    });
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

    

    
    

    

    function duplicate() {//funkce na duplikovani sudy a lichy aby se to nemuselo psat dvakrat

    }
    //suma hodin
    //to si necham spocitat db priste
    //hmm, tak to nejdriv musim poresit na DB ty zmeny na polickach rozvrhu

}