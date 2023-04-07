window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      const selectTag = document.getElementById('state');
      for (let state of data.states) {
            const optionMaker = document.createElement('option')
            optionMaker.value = state.abbreviation
            optionMaker.innerHTML = state.name
            selectTag.appendChild(optionMaker)
      }
    }
    const formListen = document.getElementById('create-location-form')
    formListen.addEventListener('submit', async (e)=> {
        e.preventDefault()
        const formData = new FormData(formListen);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json);
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
        method: "post",
        body: json,
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
        formListen.reset();
        const newLocation = await response.json();
        console.log(newLocation);
        }
    })
  });


