
    function postData() {
      // Vytvoření objektu s daty, která chcete odeslat
      var data = {
        name: "John",
        age: 30
      };

      // Vytvoření nového POST požadavku pomocí Fetch API
      fetch('/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        // Zde můžete zpracovat odpověď serveru po odeslání požadavku
        console.log('Response:', response);
      })
      .catch(error => {
        // Zde můžete zpracovat chybu při odesílání požadavku
        console.error('Error:', error);
      });
    }
